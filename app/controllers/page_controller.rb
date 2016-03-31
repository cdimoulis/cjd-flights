class PageController < ApplicationController
  def view
    if params.has_key? 'page'
      @page = params['page'];
      render 'main/index', layout: 'application'
    else
      render :file => 'public/404.html', :formats => [:html], layout: false, status: :not_found
    end
  end
end
