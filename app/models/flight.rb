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

class Flight < ActiveRecord::Base

  attr_accessor :departure_airport, :arrival_airport #, :airline

  belongs_to :airline
  has_many :trip_flights, dependent: :destroy
  has_many :trips, through: :trip_flights

  # def airline=(val)
  #   if !val.nil? and val.has_key? 'id'
  #     self.airline_id = val.id
  #     self.save()
  #   end
  # end
  #
  # def airline
  #   if self.airline.nil?
  #     airline = Airline.where("id: ?", self.airline_id).take
  #     if !airline.nil?
  #       self.airline = Airline
  #     end
  #   end
  #   self.airline
  # end

  def departure_airport=(val)
    if !val.nil? and val.has_key? 'id'
      self.departure_airport_id = val.id
      self.save()
    end
  end

  def departure_airport
    if @departure_airport.nil?
      airport = Airport.where("id = ?", self.departure_airport_id).take
      if !airport.nil?
        @departure_airport = airport
      end
    end
    @departure_airport
  end

  def arrival_airport=(val)
    if !val.nil? and val.has_key? 'id'
      self.arrival_airport_id = val.id
      self.save()
    end
  end

  def arrival_airport
    if @arrival_airport.nil?
      airport = Airport.where("id = ?", self.arrival_airport_id).take
      if !airport.nil?
        @arrival_airport = airport
      end
    end
    @arrival_airport
  end


  def attributes
    super.merge(
      'airline' => self.airline,
      'departure_airport' => self.departure_airport,
      'arrival_airport' => self.arrival_airport
    )
  end

  private

end
