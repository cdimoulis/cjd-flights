# == Schema Information
#
# Table name: flights
#
#  id                   :uuid             not null, primary key
#  airline_id           :uuid             not null
#  number               :string           not null
#  departure_date       :date             not null
#  arrival_date         :date             not null
#  departure_time       :time             not null
#  arrival_time         :time             not null
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

  attr_accessor :airline, :departure_airport, :arrival_airport

  belongs_to :airline

  validate :code_matches_airline

  def airline=(val)
    if !val.nil? and val.has_key? 'id'
      self.airline_id = val.id
      self.save()
    end
  end

  def airline
    if self.airline.nil?
      airline = Airline.where("id: ?", self.airline_id).take
      if !airline.nil?
        self.airline = Airline
      end
    end
    self.airline
  end

  def departure_airport=(val)
    if !val.nil? and val.has_key? 'id'
      self.departure_airport_id = val.id
      self.save()
    end
  end

  def departure_airport
    if self.departure_airport.nil?
      airport = Airport.where("id: ?", self.departure_airport_id).take
      if !airport.nil?
        self.departure_airport = airport
      end
    end
    self.departure_airport
  end

  def arrival_airport=(val)
    if !val.nil? and val.has_key? 'id'
      self.arrival_airport_id = val.id
      self.save()
    end
  end

  def arrival_airport
    if self.arrival_airport.nil?
      airport = Airport.where("id: ?", self.arrival_airport_id).take
      if !airport.nil?
        self.arrival_airport = airport
      end
    end
    self.arrival_airport
  end


  def attributes
    super.merge(
      'airline' => self.airline,
      'departure_airport' => self.departure_airport,
      'arrival_airport' => self.arrival_airport
    )
  end

  private

    def code_matches_airline
      if !self.airline.nil? and !self.number.nil?
        num_code = self.number[0..1]
        return num_code == self.airline.code
      end
      raise "\n\nFlight #{self.number} does not match airline code: #{self.airline.inspect}\n\n"
      Rails.logger.debug "\n\nFlight #{self.number} does not match airline code: #{self.airline.inspect}\n\n"
      return false
    end

end
