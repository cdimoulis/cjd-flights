# == Schema Information
#
# Table name: trips
#
#  id         :uuid             not null, primary key
#  text       :string           not null
#  cabin      :string           not null
#  trip_type  :string           default("roundTrip")
#  price      :float
#  notes      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Trip < ActiveRecord::Base
  include TripTypes

  has_many :trip_flights, dependent: :destroy
  has_many :flights, through: :trip_flights

  validates :trip_type, inclusion: { in: TRIP_TYPES }, allow_blank: false

  def attributes
    super.merge(
      'flights': self.flights
    )
  end

end
