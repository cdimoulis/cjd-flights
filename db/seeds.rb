# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
puts "\n\nBegin data seed...\n\n"

delta = Airline.create(
  text: 'Delta',
  code: 'DL'
)

airport_file = File.read("#{Dir.pwd}/db/airports.json")
airports = JSON.parse(airport_file)

airports.each do |airport|
  tz = Float(airport["timezone"]) *  60
  if !airport["iata"].empty? and !airport["icao"].empty?
    Airport.create(
      text: airport["name"],
      city: airport["city"],
      country: airport["country"],
      iata: airport["iata"],
      icao: airport["icao"],
      timezone: tz
    )
  end
end

stl = Airport.where(iata: "STL").take
msp = Airport.where(iata: "MSP").take
atl = Airport.where(iata: "ATL").take
bos = Airport.where(iata: "BOS").take
ord = Airport.where(iata: "ORD").take
mdw = Airport.where(iata: "MDW").take

f1 = Flight.create(
  airline_id: delta.id,
  number: "1234",
  departure_date: "2016-04-23 14:00:00",
  arrival_date: "2016-04-23 15:30:00",
  departure_airport_id: stl.id,
  arrival_airport_id: atl.id,
  cabin_code: "V",
  aircraft: "B757",
  notes: "THIS IS A TEST FLIGHT. NOT REAL"
)

f2 = Flight.create(
  airline_id: delta.id,
  number: "4321",
  departure_date: "2016-04-27 04:00:00",
  arrival_date: "2016-04-27 05:30:00",
  departure_airport_id: stl.id,
  arrival_airport_id: msp.id,
  cabin_code: "T",
  aircraft: "MD90",
  notes: "THIS IS A TEST FLIGHT. NOT REAL"
)

f3 = Flight.create(
  airline_id: delta.id,
  number: "1122",
  departure_date: "2016-03-14 12:00:00",
  arrival_date: "2016-03-14 02:07:00",
  departure_airport_id: msp.id,
  arrival_airport_id: bos.id,
  cabin_code: "T",
  aircraft: "A320",
  notes: "THIS IS A TEST FLIGHT. NOT REAL"
)


puts "\n\nEnd data seed!\n\n"
