# == Schema Information
#
# Table name: trip_flights
#
#  id         :uuid             not null, primary key
#  trip_id    :uuid             not null
#  flight_id  :uuid             not null
#  order      :integer          not null
#  group      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TripFlight < ActiveRecord::Base

  belongs_to :trip
  belongs_to :flight

  validate :flight_exists, :trip_exists

  private
    def flight_exists
      if self.attribute_present?(:flight_id) && !Flight.exists?(:flight_id)
        return true
      else
        puts "\n\n#{flight_id} cannot be an arbitrary number\n\n"
        Rails.logger.debug "\n\n#{flight_id} cannot be an arbitrary number\n\n"
        return false
      end
      return false
    end

    def trip_exists
      if self.attribute_present?(:trip_id) && !Trip.exists?(:trip_id)
        return true
      else
        puts "\n\n#{trip_id} cannot be an arbitrary number\n\n"
        Rails.logger.debug "\n\n#{trip_id} cannot be an arbitrary number\n\n"
        return false
      end
      return false
    end
end
