class List

  include Lists

  def persisted?
    false
  end

  def tripTypes
    return TRIP_TYPES
  end

  def cabins
    return CABINS
  end

  def cabinCodes
    return CABIN_CODES
  end

end
