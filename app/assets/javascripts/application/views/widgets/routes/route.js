App.View.extend({
  name: 'widgets/routes/route',
  attributes: {
    'class': 'route_info',
  },
  events: {
    'click': '_selectRoute',
  },
  data_source: [
    {key: 'model', required: true},
    {key: 'selected_route', required: false},
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupRouteDisplay',
    'setupFlightData',
  ],

  setup: function() {
    _.bindAll(this, '_selectedChange', '_selectRoute');
    this.display = {};
    this.configs = {
      flights: []
    };
    this.flights = new App.Collections.Flights(this.data.model.get('flights'))

    if (this.data.selected_route && this.data.selected_route.isSame(this.data.model)) {
      this.$el.addClass('selected');
    }
  },

  setupListeners: function() {
    this.listenTo(this.data.selected_route, 'change', this._selectedChange);
  },

  setupRouteDisplay: function() {
    var _this = this;
    var route = this.data.model;
    var departure_date = moment(route.get('departure_date')+" "+route.get('departure_time'));
    var arrival_date = moment(route.get('arrival_date')+" "+route.get('arrival_time'));
    var duration = moment.duration(arrival_date.valueOf() - departure_date.valueOf());

    this.display.departure_date = departure_date.format('MMMM Do');
    this.display.departure_time = departure_date.format('h:mm A');
    if (!moment(departure_date.format('YYYY-MM-DD')).isSame(moment(arrival_date.format('YYYY-MM-DD')))) {
      this.display.arrival_date = arrival_date.format('MMMM Do');
    }
    this.display.arrival_time = arrival_date.format('h:mm A');
    if (duration.days()) {
      this.display.duration = duration.days()+"d "+duration.hours()+"h "+duration.minutes()+"m";
    }
    else {
      this.display.duration = duration.hours()+"h "+duration.minutes()+"m";
    }
  },

  setupFlightData: function() {
    var _this = this;

    this.flights.each(function(flight) {
      _this.configs.flights.push({model: flight});
    });
  },

  _selectedChange: function() {
    if (this.data.selected_route.isSame(this.data.model)) {
      this.$el.addClass('selected');
    }
    else {
      this.$el.removeClass('selected');
    }
  },

  _selectRoute: function() {
    this.data.selected_route.set(this.data.model.attributes);
    this.$el.addClass('selected');
  }
});
