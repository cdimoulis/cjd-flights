class TripsController < ApplicationController
  respond_to :json

  def create
    super
  end

  def index
    # ONLY CURRENT TRIPS, FLIGHTS TODAY AND FUTURE
    if params.has_key?(:current) and params[:current]
      flights = Flight.where("arrival_date >= ?", DateTime.now.beginning_of_day)
      flights.each do |f|
        trips = flights.trips
        if records.nil?
          records = trips
        else
          records.merge( trips )
        end
      end
    end

    if !records.nil?
      respond_with( records )
    else
      super
    end
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
    trip = Trip.where('id = ?', params[:id]).take
    if !trip.nil
      respond_with( trip.flights )
    else
      render :json => { error: 404 }, :status => 404
    end
  end

  def update_flights
    trip = Trip.where('id = ?', params[:id]).take
    flights = params[:flights]
    if !trip.nil
      


    else
      render :json => { error: 404 }, :status => 404
    end
  end

  private

    def permitted_params
      params.require(:trip).permit(:text, :cabin, :trip_type, :price, :notes)
    end

end
