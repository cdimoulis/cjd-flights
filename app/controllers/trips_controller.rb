class TripsController < ApplicationController
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

    def required_params
      params.require(:trip).permit(:text, :cabin, :trip_type, :price, :notes)
    end

end
