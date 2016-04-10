App.View.extend({
  name: 'widgets/trip/flights',
  attributes: {
    'class': 'form_trip_flights',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {
    this.components = c = {};
    this.trip = this.data.model;
    this.flights = new App.Collections.Flights(this.trip.get('flights'));
    this.selected_flight = new App.Models.Flight();

    //// TEST TEST TEST
    test_flights = new App.Collections.Flights();
    test_flights.fetch();
    //// END TEST

    view_data = {
      selected_flight: this.selected_flight,
    };

    c.flight_list = {
      collection: test_flights, //this.flights,
      view: 'widgets/trip/flight',
      view_data: view_data,
    };
  },
});
