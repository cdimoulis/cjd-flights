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

require 'test_helper'

class TripTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
