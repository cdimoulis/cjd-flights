# == Schema Information
#
# Table name: trips
#
#  id         :uuid             not null, primary key
#  cabin      :string           not null
#  trip_type  :string           default("roundTrip")
#  price      :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Trip < ActiveRecord::Base

  has_many :trip_flights
  has_many :flights, through: :trip_flights

  def attributes
    super.merge(
      'flights': self.flights
    )
  end

end
