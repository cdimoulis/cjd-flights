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

  end

  def destroy

  end

  private

    def airport_params
      params.require(:airport).permit(:text, :code, :city, :state, :country,
                                      :timezone)
    end
end
