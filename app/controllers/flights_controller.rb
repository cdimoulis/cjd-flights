class FlightsController < ApplicationController
  respond_to :json

  def create
    super
  end

  def index
    # ONLY CURRENT FLIGHTS. TODAY AND FUTURE
    if params.has_key?(:current) and params[:current]
      records = Flight.where("arrival_date >= ?", DateTime.now.beginning_of_day)
    end


    # FLIGHTS WITH SPECIFIC AIRCRAFT
    if params.has_key?(:aircraft)
      if !records.nil?
        records = records.where("aircraft = ?", params[:aircraft])
      else
        records = Flight.where("aircraft = ?", params[:aircraft])
      end
    end

    # FLIGHTS FROM A SPECIFIC airline_id
    if params.has_key?(:airline_id)
      if !records.nil?
        records = records.where("airline_id = ?", params[:airline_id])
      else
        records = Flight.where("airline_id = ?", params[:airline_id])
      end
    end

    # IF THERE ARE RECORDS, RETURN THEM, OTHERWISE SUPER
    if !records.nil?
      respond_with( records )
    else
      super
    end
  end

  def show
    super
  end

  def update
    super
  end

  def destroy
    super
  end

  ######
  # END BASIC CRUD OPS
  ######

  def trips
    flight = Flight.where("id = ?", params[:id]).take
    if flight.nil?
      render :json => {errors: "404"}, :status => 404
    else
      respond_with( flight.trips )
    end
  end

  def search
    post_params = {
      "departureAirportCode": "ORD",
      "arrivalAirportCode": "ATL",
      "flightDateField": "08/10/2016",
      "flightDate": "2016-08-10",
      "departureTime": '0400A',
      "skdEndRecord": 2000
    }

    headers = {
      "Content-Type" => "text/html",
      "Accept" => "application/x-www-form-urlencoded"
    }

    uri = URI.parse('https://www.delta.com/flightinfo/viewFlightSchedules.action')
    res = Net::HTTP.post_form(uri, post_params)

    # puts "\n\nBODY: #{res.body}\n\n\n\n"
    # page = Nokogiri::HTML(res.body)
    # table = page.css('tbody.schedulesTableBody')
    # render :json => res.body

    flights = parseDeltaFlights res.body

    render :json => flights.to_json
  end

  private

    def permitted_params
      params.require(:flight).permit(:airline_id, :number, :departure_date,
                                      :arrival_date, :departure_airport_id,
                                      :arrival_airport_id, :cabin_code, :fare_basis,
                                      :aircraft, :notes)
    end

    def parseDeltaFlights(raw_html)
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
          puts "\n#{current_index}-#{current_fl_index}"

          if flights[current_index-1].nil?
            flights[current_index-1] = []
          end

          obj = {}

          # FLIGHT NUMBER
          obj["flight_num"] = flight.css('input[name="flightNumber"]')[0]['value']\

          # DEPARTURE AIRPORT
          depart_airport = flight.css("td[headers='depart-header depart-airport-header flightnum-row-header_#{current_index}_#{current_fl_index}']")
          if depart_airport.css('span.schedules_airport_code').length == 0
            obj['departure'] = depart_airport.css('span')[0].text.strip().gsub(/\s+/, " ")
          else
            obj['departure'] = depart_airport.css('span.schedules_airport_code')[0].text.strip().gsub(/\s+/, " ") #each_with_index do |td, index|
          end

          # DEPARTURE TIME
          time_val = flight.css("td[headers='depart-header depart-timedate-header flightnum-row-header_#{current_index}_#{current_fl_index}']").text.strip().gsub(/\s+/, " ")
          time_arr = time_val.split(' ')
          obj['departure_time'] = time_arr.shift
          obj['departure_date'] = time_arr.join ' '

          # ARRIVAL AIRPORT, TIME, DATE
          flight.css("td[headers='arrive-header arrive-airport-header flightnum-row-header_#{current_index}_#{current_fl_index}']").each_with_index do |td, i|
            case i
            when 0
              if td.css('span.schedules_airport_code').length == 0
                obj['arrival'] = td.css('span')[0].text.strip().gsub(/\s+/, " ")
              else
                obj['arrival'] = td.css('span.schedules_airport_code')[0].text.strip().gsub(/\s+/, " ")
              end
            when 1
              val = td.text.strip().gsub(/\s+/, " ")
              arr = val.split(' ')
              obj['arrival_time'] = arr.shift
              obj['arrival_date'] = arr.join ' '
            when 2
              obj['aircraft'] = td.text.strip().gsub(/\s+/, " ")
            end
          end

          flights[current_index-1][current_fl_index-1] = obj
        end
      end

      return flights
    end
end
