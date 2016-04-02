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
    super
  end

  def destroy
    super
  end

  private

    def permitted_params
      params.require(:trip).permit(:text, :cabin, :trip_type, :price, :notes)
    end

end
