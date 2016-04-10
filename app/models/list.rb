class List
  # include ActiveModel::Validations
  # include ActiveModel::Conversion
  # extend ActiveModel::Naming

  include Lists

  # attr_reader :tripTypes, :cabins, :cabinCodes

  def initialize(attributes = {})
    # attributes.each do |name, value|
    #   send("#{name}=", value)
    # end
  end

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
