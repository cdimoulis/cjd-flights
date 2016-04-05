# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#


delta = Airline.create(
  text: 'Delta',
  code: 'DL'
)

stl = Airport.create(
  text: "St. Louis Lambert International Airport",
  city: "St. Louis",
  state: "Missouri",
  country: "United States",
  code: "STL",
  timezone: -360
)
msp = Airport.create(
  text: "Minneapolis-Saint Paul International Airport",
  city: "Minneapolis",
  state: "Minnesota",
  country: "United States",
  code: "MSP",
  timezone: -360
)
atl = Airport.create(
  text: "Atlanta Hartsfield International Airport",
  city: "Atlanta",
  state: "Georgia",
  country: "United States",
  code: "ATL",
  timezone: -300
)
bos = Airport.create(
  text: "Boston Logan International Airport",
  city: "Boston",
  state: "Massachusetts",
  country: "United States",
  code: "BOS",
  timezone: -300
)
ord = Airport.create(
  text: "Chicago O'Hare International Airport",
  city: "Chicago",
  state: "Illinois",
  country: "United States",
  code: "ORD",
  timezone: -360
)
mdw = Airport.create(
  text: "Chicago Midway International Airport",
  city: "Chicago",
  state: "Illinois",
  country: "United States",
  code: "MDW",
  timezone: -360
)

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
