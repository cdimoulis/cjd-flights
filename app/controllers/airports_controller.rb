class AirportsController < ApplicationController
  respond_to :json

  def create
    super
  end

  def index
    if params.has_key?(:country)
      country = params[:country]
    else
      country = "United States"
    end

    records = Airport.where(country: country)

    respond_with( records )
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
    airport = Airport.where("id = ?", params[:id]).take
    if !airport.nil?
      if params.has_key?(:airport_as)
        # ONLY GET DEPARTURE FLIGHTS
        if params[:airport_as] == "departure"
          flights = airport.flights_as_departure()
        end
        # ONLY GET ARRIVAL AIRPORTS
        if params[:airport_as] == "arrival"
          flights = airport.flights_as_arrival()
        end
      end
      # GET FLIGHTS WHERE AIRPORT IS DEPARTURE OR ARRIVAL
      if flights.nil?
        flights = Flight.where("departure_airport_id = ? OR arrival_airport_id = ?", params[:id], params[:id])
      end
      respond_with( flights )
    else
      render :json => { errors: 404 }, :status  => 404
    end
  end

  def search
    q = params[:q]

    post_params = {
      method: "suggest",
      params: {
        "1": q,
        "2": 3
      }
    }
    
    headers = {
      "Content-Type" => "application/javascript",
      "Accept" => "application/javascript"
    }

    uri = URI.parse('http://matrix.itasoftware.com/geosearch')
    req = Net::HTTP.new(uri.host, uri.port)
    res = req.post(uri.path, post_params.to_json, headers)

    results = JSON.parse(res.body)["result"][1]
    render :json => results.to_json
  end

  private

    def permitted_params
      params.require(:airport).permit(:text, :iata, :icao, :city, :state,
                                      :country, :timezone)
    end

end

###
# ITA MATRIX KEYS
####

#### REQUEST PARAM "2" Options #####
# 1 - [null, "Dallas, TX", "city", null, "", "Dallas", -96.8066667, 32.7830556]
# 2 - null
# 3 - [null, "Dallas/Fort Worth International, TX (DFW)", "airport", "DFW", "DFW", "Dallas/Fort Worth", -97.038056, 32.8969444, null, null, "America/Chicago"]
# 4 - [null, "Dallas/Fort Worth International, TX (DFW)", "airport", "DFW", "DFW", "Dallas/Fort Worth", -97.038056, 32.8969444, null, null, "America/Chicago"]
# 5 - [null, "Dallas/Fort Worth, TX", "city", "DFW", "DFW", "Dallas/Fort Worth, TX", -96.98224364609811, 32.88205557596436, "DFW", "Dallas/Fort Worth", "America/Chicago"]
# 6 - [null, "Dallas/Fort Worth International, TX (DFW)", "airport", "DFW", "DFW", "Dallas/Fort Worth", -97.038056, 32.8969444, null, null, "America/Chicago"]
# 7 - [null, "Dominican Republic", "country", "DO"]
# 8 - [null, "Dallas, TX", "city", null, "", "Dallas", -96.8066667, 32.7830556]
# 9 - [null, "Dallas, TX", "city", null, "", "Dallas", -96.8066667, 32.7830556]
