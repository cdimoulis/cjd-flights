# == Schema Information
#
# Table name: airports
#
#  id         :uuid             not null, primary key
#  text       :string
#  city       :string           not null
#  state      :string
#  country    :string           not null
#  code       :string           not null
#  timezone   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Airport < ActiveRecord::Base

  validates :country, inclusion: { in: COUNTRIES.keys }, allow_blank: false

  def flights_as_departure
    flights = Flight.where("departure_airport_id = ?", self.id)
    return flights
  end

  def flights_as_arrival
    flights = Flight.where("arrival_airport_id = ?", self.id)
    return flights
  end

end
