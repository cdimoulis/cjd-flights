App.View.extend({
  name: 'widgets/routes/route',
  attributes: {
    'class': 'route_info',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
    'setupDisplay',
  ],

  setup: function() {
    this.display = {};
    this.flights = new App.Collections.Flights(this.data.model.get('flights'))

  },

  setupDisplay: function() {
    var _this = this;
    var route = this.data.model;
    this.display.departure_date = moment(route.get('departure_date')).format("DD MMM");
    this.display.departure_time = moment(route.get('departure_time'), 'HH:mm:ss').format('hh:mm A');
    this.display.arrival_date = moment(route.get('arrival_date')).format("DD MMM");
    this.display.arrival_time = moment(route.get('arrival_time'), 'HH:mm:ss').format('hh:mm A');

    this.display.flights = [];
    this.flights.each(function(flight) {
      dm = moment(flight.get('departure_date'));
      am = moment(flight.get('arrival_date'));
      obj = {
        departure_iata: flight.get('departure_airport').iata,
        arrival_iata: flight.get('arrival_airport').iata,
        number: flight.get('number'),
        departure_time: dm.format('hh:mm A'),
        arrival_time: am.format('hh:mm A')
      };
      _this.display.flights.push(obj)
    });
  },
});
