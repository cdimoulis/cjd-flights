class AirportsController < ApplicationController
  respond_to :json

  def create
    super
  end

  def index
    if params.has_key?(:country)
      country = params[:country]
    else
      country = "United States"
    end

    records = Airport.where(country: country)

    respond_with( records )
  end

  def show
    super
  end

  def update
    super
  end

  def destroy
    super
  end

  ######
  # END BASIC CRUD OPS
  ######

  def flights
    airport = Airport.where("id = ?", params[:id]).take
    if !airport.nil?
      if params.has_key?(:airport_as)
        # ONLY GET DEPARTURE FLIGHTS
        if params[:airport_as] == "departure"
          flights = airport.flights_as_departure()
        end
        # ONLY GET ARRIVAL AIRPORTS
        if params[:airport_as] == "arrival"
          flights = airport.flights_as_arrival()
        end
      end
      # GET FLIGHTS WHERE AIRPORT IS DEPARTURE OR ARRIVAL
      if flights.nil?
        flights = Flight.where("departure_airport_id = ? OR arrival_airport_id = ?", params[:id], params[:id])
      end
      respond_with( flights )
    else
      render :json => { errors: 404 }, :status  => 404
    end
  end

  private

    def permitted_params
      params.require(:airport).permit(:text, :iata, :icao, :city, :state,
                                      :country, :timezone)
    end

end
