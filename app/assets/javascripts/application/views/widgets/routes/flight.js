App.View.extend({
  name: 'widgets/routes/flight',
  attributes: {
    'class': 'flight_info',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
    'setupFlightDisplay',
  ],

  setup: function() {
    this.display = {};

  },

  setupFlightDisplay: function() {
    var flight = this.data.model;
    dm = moment(flight.get('departure_date'));
    am = moment(flight.get('arrival_date'));

    this.display.departure_iata = flight.get('departure_airport').iata;
    this.display.arrival_iata = flight.get('arrival_airport').iata;
    this.display.number = flight.get('number');
    this.display.departure_time = dm.format('hh:mm A');
    this.display.arrival_time = am.format('hh:mm A');
    this.display.aircraft = flight.get('aircraft');
  },
});
