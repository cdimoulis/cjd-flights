# == Schema Information
#
# Table name: flights
#
#  id               :uuid             not null, primary key
#  airline_id       :uuid             not null
#  number           :string           not null
#  departure_date   :date             not null
#  arrival_date     :date             not null
#  departure_time   :time             not null
#  arrival_time     :time             not null
#  departure_airpot :uuid             not null
#  arrival_airport  :uuid             not null
#  cabin_code       :string           not null
#  fare_basis       :string
#  aircraft         :string
#  notes            :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Flight < ActiveRecord::Base
end
