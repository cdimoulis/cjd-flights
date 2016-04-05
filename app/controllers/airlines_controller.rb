class AirlinesController < ApplicationController
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
    airline = Airline.where("id = ?", params[:id]).take

    if !airline.nil?
      respond_with( airline.flights )
    else
      render :json => { error: 404 }, :status => 404
    end
  end

  private

    def permitted_params
      params.require(:airline).permit(:text, :code)
    end

end
