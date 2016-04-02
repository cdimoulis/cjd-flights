class AirportsController < ApplicationController
  respond_to :json

  def create
    super
  end

  def index
    super
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
    airport = Airport.where("id = ?", params[:id])
    if !airport.nil?
      if params.has_key?(:airport_as)
        if params[:airport_as] == "departure"
          flights = airport.flights_as_departure
        else
          flights = airport.flights_as_arrival
        end
        respond_with( flights )
      else
        flights = Flight.where("departure_airport_id = ? AND arrival_airport_id = ?", params[:id], params[:id])
        respond_with( flights )
      end
    else
      render :json => { errors: 404 }, :status  => 404
    end
  end

  private

    def permitted_params
      params.require(:airport).permit(:text, :code, :city, :state,
                                      :country, :timezone)
    end

end
