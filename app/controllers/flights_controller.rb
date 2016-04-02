class FlightsController < ApplicationController
  respond_to :json

  def create
    super
  end

  def index
    puts "\n\nparams: #{params}\n\n"
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

  def trips
    flight = Flight.where("id = ?", params[:id]).take
    if flight.nil?
      render :json => {errors: "404"}, :status => 404
    else
      respond_with( flight.trips )
    end
  end

  private

    def permitted_params
      params.require(:flight).permit(:airline_id, :number, :departure_date,
                                      :arrival_date, :departure_airport_id,
                                      :arrival_airport_id, :cabin_code, :fare_basis,
                                      :aircraft, :notes)
    end

end
