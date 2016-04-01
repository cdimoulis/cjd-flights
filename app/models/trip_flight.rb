# == Schema Information
#
# Table name: trip_flights
#
#  id         :uuid             not null, primary key
#  trip_id    :uuid             not null
#  flight_id  :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TripFlight < ActiveRecord::Base

  belongs_to :trip
  belongs_to :flight

  private
    def flight_exists
      if self.attribute_present?(:flight_id) && !Flight.exists?(flight_id)
        errors.add(:flight_id, "cannot be an arbitrary number")
      end
    end

    def trip_exists
      if self.attribute_present?(:trip_id) && !Trip.exists?(trip_id)
        errors.add(:trip_id, "cannot be an arbitrary number")
      end
    end
end
