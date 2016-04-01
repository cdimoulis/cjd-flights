# == Schema Information
#
# Table name: airports
#
#  id         :uuid             not null, primary key
#  text       :string
#  city       :string           not null
#  state      :string
#  country    :string           not null
#  code       :string           not null
#  timezone   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Airport < ActiveRecord::Base

  
end
