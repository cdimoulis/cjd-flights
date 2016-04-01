# == Schema Information
#
# Table name: trips
#
#  id         :uuid             not null, primary key
#  cabin      :string           not null
#  type       :string           default("roundTrip")
#  price      :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class TripTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
