###############
#
# This controller is to facilitate the searching of routes
# using 3rd party requests. There are no server models
# associated with this

class RoutesController < ApplicationController
  respond_to :json

  def search
    post_params = {
      "departureAirportCode": params[:departure],
      "arrivalAirportCode": params[:arrival],
      "flightDateField": params[:date].gsub('-','/'),
      "flightDate": params[:date],
      "departureTime": params[:departure_time],
      "skdEndRecord": 2000
    }

    headers = {
      "Content-Type" => "text/html",
      "Accept" => "application/x-www-form-urlencoded"
    }

    uri = URI.parse('https://www.delta.com/flightinfo/viewFlightSchedules.action')
    res = Net::HTTP.post_form(uri, post_params)

    parsed_flights = parseDeltaFlights res.body

    routes = buildRoutes parsed_flights

    render :json => routes.to_json
  end


  private

    ###
    # Parse the flights returned by searching routes
    ###
    def parseDeltaFlights(raw_html)
      delta = Airline.where(text: "Delta").take
      throw "\n\nCould not find Delta airline.\n\n" if delta.nil?

      page = Nokogiri::HTML(raw_html)
      table = page.css('tbody.schedulesTableBody')

      flights = []
      current_index = 1
      current_fl_index = 1
      table.css('tr').each do |flight|
        if flight.css('th').length == 0
          note = flight.css('td')[0].css('span')[0].text
          flights[current_index-1][current_fl_index-1]['note'] = note
        else
          row_flight = flight.css('th')[0]['id'].split('_')
          current_index = row_flight[1].to_i
          current_fl_index = row_flight[2].to_i

          if flights[current_index-1].nil?
            flights[current_index-1] = []
          end

          flight_obj = {}
          flight_obj['airline_id'] = delta.id
          flight_obj['airline'] = delta
          flight_obj['flight_order'] = current_fl_index-1

          # FLIGHT NUMBER
          flight_obj["number"] = flight.css('input[name="flightNumber"]')[0]['value']\

          # DEPARTURE AIRPORT
          depart_airport = flight.css("td[headers='depart-header depart-airport-header flightnum-row-header_#{current_index}_#{current_fl_index}']")
          if depart_airport.css('span.schedules_airport_code').length == 0
            dep = depart_airport.css('span')[0].text.strip().gsub(/\s+/, " ")
          else
            dep = depart_airport.css('span.schedules_airport_code')[0].text.strip().gsub(/\s+/, " ")
          end
          departure_airport = Airport.where(iata: dep).take
          flight_obj['departure_airport_id'] = departure_airport.id
          flight_obj['departure_airport'] = departure_airport

          # DEPARTURE TIME
          time_val = flight.css("td[headers='depart-header depart-timedate-header flightnum-row-header_#{current_index}_#{current_fl_index}']").text.strip().gsub(/\s+/, " ")
          time_arr = time_val.split(' ')
          t = time_arr.shift
          flight_obj['departure_date'] = DateTime.parse("#{time_arr.join(' ')} #{t}").strftime("%Y-%m-%d %H:%M:%S")

          # ARRIVAL AIRPORT, TIME, DATE
          flight.css("td[headers='arrive-header arrive-airport-header flightnum-row-header_#{current_index}_#{current_fl_index}']").each_with_index do |td, i|
            case i
            when 0
              if td.css('span.schedules_airport_code').length == 0
                arr = td.css('span')[0].text.strip().gsub(/\s+/, " ")
              else
                arr = td.css('span.schedules_airport_code')[0].text.strip().gsub(/\s+/, " ")
              end
              arrival_airport = Airport.where(iata: arr).take
              flight_obj['arrival_airport_id'] = arrival_airport.id
              flight_obj['arrival_airport'] = arrival_airport
            when 1
              val = td.text.strip().gsub(/\s+/, " ")
              arr = val.split(' ')
              t = arr.shift
              flight_obj['arrival_date'] = DateTime.parse("#{arr.join(' ')} #{t}").strftime("%Y-%m-%d %H:%M:%S")
            when 2
              flight_obj['aircraft'] = td.text.strip().gsub(/\s+/, " ")
            end
          end

          flights[current_index-1][current_fl_index-1] = flight_obj
        end
      end

      return flights
    end

    def buildRoutes(flights)
      routes = []
      flights.each do |f|
        dept_date = DateTime.parse f.first['departure_date']
        arr_date = DateTime.parse f.last['arrival_date']

        obj = {
          departure_date: dept_date.strftime("%Y-%m-%d"),
          departure_time: dept_date.strftime("%H:%M:%S"),
          arrival_date: arr_date.strftime("%Y-%m-%d"),
          arrival_time: arr_date.strftime("%H:%M:%S"),
          num_legs: f.length,
          flights: f
        }
        routes.push obj
      end

      ###
      # END parse routes needs
      ###

      return routes
    end
end
