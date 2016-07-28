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
    'setupRouteDisplay',
    'setupFlightDisplay',
  ],

  setup: function() {
    this.display = {};
    this.flights = new App.Collections.Flights(this.data.model.get('flights'))

  },

  setupRouteDisplay: function() {
    var _this = this;
    var route = this.data.model;
    var departure_date = moment(route.get('departure_date')+" "+route.get('departure_time'));
    var arrival_date = moment(route.get('arrival_date')+" "+route.get('arrival_time'));
    var duration = moment.duration(arrival_date.valueOf() - departure_date.valueOf());

    this.display.departure_date = departure_date.format('MMMM Do');
    this.display.departure_time = departure_date.format('h:mm A');
    this.display.arrival_date = arrival_date.format('MMMM Do');
    this.display.arrival_time = arrival_date.format('h:mm A');
    if (duration.days()) {
      this.display.duration = duration.days()+" Days "+duration.hours()+" Hours "+duration.minutes()+" Minutes";
    }
    else {
      this.display.duration = duration.hours()+" Hours "+duration.minutes()+" Minutes";
    }
  },

  setupFlightDisplay: function() {
    var _this = this;

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
