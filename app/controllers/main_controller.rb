class MainController < ApplicationController

  def index
    @page = 'home'
  end

  def testroute
    post_params = {
      "departureAirportCode": "ORD",
      "arrivalAirportCode": "ATL",
      "flightDateField": "08/10/2016",
      "flightDate": "2016-08-10",
      "departureTime": "D",
      "skdEndRecord": 2000
    }

    headers = {
      "Content-Type" => "text/html",
      "Accept" => "application/x-www-form-urlencoded"
    }

    uri = URI.parse('https://www.delta.com/flightinfo/viewFlightSchedules.action')
    # req = Net::HTTP.new(uri.host, uri.port)
    # req.use_ssl = true
    # req.verify_mode = OpenSSL::SSL::VERIFY_NONE
    # res = req.post(uri.path, post_params, headers)
    res = Net::HTTP.post_form(uri, post_params)

    page = Nokogiri::HTML(res.body)
    table = page.css('tbody.schedulesTableBody')

    flights = []
    table.css('tr').each do |flight|
      row_flight = flight.css('th')[0]['id'].split('_')
      index = row_flight[1]
      fl_index = row_flight[2]

      puts "\n\nrow-flight #{index}: #{fl_index}"
      obj = {}

      # FLIGHT NUMBER
      obj["flight_num"] = flight.css('input[name="flightNumber"]')[0]['value']\
      # DEPARTURE AIRPORT
      obj['departure'] = flight.css("td[headers='depart-header depart-airport-header flightnum-row-header_#{index}_#{fl_index}']").text.strip().gsub(/\s+/, " ") #each_with_index do |td, index|
      # DEPARTURE TIME
      time_val = flight.css("td[headers='depart-header depart-timedate-header flightnum-row-header_#{index}_#{fl_index}']").text.strip().gsub(/\s+/, " ")
      time_arr = time_val.split(' ')
      obj['departure_time'] = time_arr.shift
      obj['departure_date'] = time_arr.join ' '

      # ARRIVAL AIRPORT, TIME, DATE
      flight.css("td[headers='arrive-header arrive-airport-header flightnum-row-header_#{index}_#{fl_index}']").each_with_index do |td, index|
        case index
        when 0
          obj['arrival'] = td.css('span.schedules_airport_code')[0].text.strip().gsub(/\s+/, " ")
        when 1
          val = td.text.strip().gsub(/\s+/, " ")
          arr = val.split(' ')
          obj['arrival_time'] = arr.shift
          obj['arrival_date'] = arr.join ' '
        when 2
          obj['aircraft'] = td.text.strip().gsub(/\s+/, " ")
        end
      end

      flights.push obj
    end

    render :json => flights.to_json
  end

end
