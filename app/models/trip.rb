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

class Trip < ActiveRecord::Base

  has_and_belongs_to_many :flights


  def attributes
    super.merge(
      'flights': self.flights
    )
  end

end
