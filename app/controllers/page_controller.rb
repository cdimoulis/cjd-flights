class PageController < ApplicationController
  def view
    if params.has_key? 'page'
      @page = params['page'];
      render 'main/index', layout: 'application'
    else
      render :file => 'public/404.html', :formats => [:html], layout: false, status: :not_found
    end
  end

  def trip
    @page = 'trip'
    # If there is an id for trip get the trip
    if params.has_key? 'id'
      trip = Trip.where("id = ?", params[:id]).take
      if !trip.nil?
        @page_params = {:trip => trip}.to_json
      end
    end
    render 'main/index/', layout: 'application'
  end
end
