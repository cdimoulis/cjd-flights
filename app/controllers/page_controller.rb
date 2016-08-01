class PageController < ApplicationController
  def view
    if params.has_key? 'page'
      @page = params['page'];
      @page_params = defaultPageParams().to_json
      render 'main/index', layout: 'application'
    else
      render :file => 'public/404.html', :formats => [:html], layout: false, status: :not_found
    end
  end

  def trip
    @page = 'trip'
    page_params = defaultPageParams
    # If there is an id for trip get the trip
    if params.has_key? 'id'
      trip = Trip.where("id = ?", params[:id]).take
      if !trip.nil?
        page_params[:trip] = trip
      end
    end
    @page_params = page_params.to_json
    render 'main/index/', layout: 'application'
  end

  private
    def defaultPageParams
      list = List.new
      airlines = Airline.all
      page_params = {
        :airlines => airlines,
        :trip_types => list.tripTypes,
        :cabins => list.cabins,
        :cabin_codes => list.cabinCodes
      }
      return page_params
    end
end
