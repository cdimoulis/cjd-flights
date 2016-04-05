# == Schema Information
#
# Table name: flights
#
#  id                   :uuid             not null, primary key
#  airline_id           :uuid             not null
#  number               :string           not null
#  departure_date       :datetime         not null
#  arrival_date         :datetime         not null
#  departure_airport_id :uuid             not null
#  arrival_airport_id   :uuid             not null
#  cabin_code           :string           not null
#  fare_basis           :string
#  aircraft             :string
#  notes                :text
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

require 'test_helper'

class FlightTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
