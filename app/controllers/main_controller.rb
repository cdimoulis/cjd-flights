class MainController < ApplicationController

  def index
    @page = 'home'
  end

  def testroute
    post_params = {
    }

    headers = {
      "Content-Type" => "text/html",
      "Accept" => "application/x-www-form-urlencoded"
    }

    uri = URI.parse('https://www.delta.com/flightinfo/viewFlightSchedules.action')
    # req = Net::HTTP.new(uri.host, uri.port)
    # req.use_ssl = true
    # req.verify_mode = OpenSSL::SSL::VERIFY_NONE
    # res = req.post(uri.path, post_params, headers)
    res = Net::HTTP.post_form(uri, post_params)

    render :json => flights.to_json
  end

end
