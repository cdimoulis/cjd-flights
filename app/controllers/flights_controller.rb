class FlightsController < ApplicationController
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

  end

  def destroy

  end

  private

    def flight_params
      params.require(:flight).permit(:airline_id, :number, :departure_date,
                                      :arrival_date, :departure_airport_id,
                                      :arrival_airport_id, :cabin_code, :fare_basis,
                                      :aircraft, :notes)
    end
end
