# == Schema Information
#
# Table name: airlines
#
#  id         :uuid             not null, primary key
#  text       :string           not null
#  code       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Airline < ActiveRecord::Base

  has_many :flights

end
