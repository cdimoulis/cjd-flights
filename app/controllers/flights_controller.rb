class FlightsController < ApplicationController
  respond_to :json

  def create
    super
  end

  def index
    # ONLY CURRENT FLIGHTS. TODAY AND FUTURE
    if params.has_key?(:current) and params[:current]
      records = Flight.where("arrival_date >= ?", DateTime.now.beginning_of_day)
    end


    # FLIGHTS WITH SPECIFIC AIRCRAFT
    if params.has_key?(:aircraft)
      if !records.nil?
        records = records.where("aircraft = ?", params[:aircraft])
      else
        records = Flight.where("aircraft = ?", params[:aircraft])
      end
    end

    # FLIGHTS FROM A SPECIFIC airline_id
    if params.has_key?(:airline_id)
      if !records.nil?
        records = records.where("airline_id = ?", params[:airline_id])
      else
        records = Flight.where("airline_id = ?", params[:airline_id])
      end
    end

    # IF THERE ARE RECORDS, RETURN THEM, OTHERWISE SUPER
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
