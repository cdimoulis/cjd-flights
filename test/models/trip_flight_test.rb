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

require 'test_helper'

class TripFlightTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
