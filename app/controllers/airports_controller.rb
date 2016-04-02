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

  private

    def permitted_params
      params.require(:airport).permit(:text, :code, :city, :state, :country,
                                      :timezone)
    end

end
