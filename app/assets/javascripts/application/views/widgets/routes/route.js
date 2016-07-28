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
    'setupFlightData',
  ],

  setup: function() {
    this.display = {};
    this.configs = {
      flights: []
    };
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

  setupFlightData: function() {
    var _this = this;

    this.flights.each(function(flight) {
      _this.configs.flights.push({model: flight});
    });
  },
});
