App.View.extend({
  name: 'forms/trip/flights',
  tagName: 'form',
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

    view_data = {
      selected_flight: this.selected_flight,
    };

    c.flight_list = {
      collection: this.flights,
      view: ''
    };
  },
});
