App.View.extend({
  name: 'widgets/build/results/connections',
  attributes: {
    'class': 'build_results_selection',
  },
  data_source: [
    {key: 'leg', required: true},
    {key: 'selected_route', required: false},
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, '_changeLeg', '_splitConnections', '_setupConnectionCollection');
    this.components = {};
    this.connections = {
      direct: new App.Collections.Routes(),
      single: new App.Collections.Routes(),
      double: new App.Collections.Routes(),
    };
    this.show = {
      direct: true,
      single: false,
      double: false,
    };
    this.routes = {
      a: new App.Collections.Routes(),
      b: new App.Collections.Routes(),
      c: new App.Collections.Routes(),
    };

    this.possible_connections = new App.Collection();
    this.selected_connections = new App.Collection();
    this.temp_routes = new App.Collections.Routes();
  },

  setupListeners: function() {
    this.listenTo(this.data.leg, 'change', this._changeLeg);

    this.listenTo(this.selected_connections, 'reset', function() {
      var f = this.selected_connections.first();
      this.show.direct = this.show.single = this.show.double = false;
      if (f) {
        this.show[f.get('text')] = true
      }
      this._setupConnectionRoutes();
      this.render();
    });
  },

  setupComponents: function() {
    var c = this.components;
    c.select_connection = {
      collection: this.possible_connections,
      selected: this.selected_connections,
      label_attr: 'text',
      title: 'Connections:',
    }

    c.a_routes = {
      routes: this.routes.a,
    };

    c.b_routes = {
      routes: this.routes.b,
    };

    c.c_routes = {
      routes: this.routes.c,
    };
  },

  _changeLeg: function() {
    this._splitConnections();
    this._setupConnectionCollection();
    this._setupConnectionRoutes();
    this.render();
  },

  _splitConnections: function() {
    if (this.data.leg.has('routes')) {
      this.connections.direct.reset(this.data.leg.get('routes').where({num_legs: 1}));
      this.connections.single.reset(this.data.leg.get('routes').where({num_legs: 2}));
      this.connections.double.reset(this.data.leg.get('routes').where({num_legs: 3}));
    }
  },

  _setupConnectionCollection: function() {
    var con = [];
    _.each(this.connections, function(val, key) {
      if (val.length > 0){
        var m = new App.Model({text: key, collection: val});
        con.push(m);
      }
    });
    if (con.length > 0) {
      this.selected_connections.add(_.first(con));
      this.possible_connections.reset(con);
    }
    else {
      this.selected_connections.reset([]);
      this.possible_connections.reset([]);
    }
  },

  _setupConnectionRoutes: function() {
    if (this.show.direct) {
      this.routes.a.reset(this.connections.direct.models);
    }
    else if (this.show.single) {
      var flights = new App.Collections.Flights(_.flatten(this.connections.single.pluck('flights')));
      var flights_a = new App.Collections.Flights(flights.where({flight_order: 0}));
      var flights_b = new App.Collections.Flights(flights.where({flight_order: 1}));
      flights_a.removeDuplicates()
      flights_b.removeDuplicates()
      this.routes.a.reset(this._setupRoutes(flights_a));
      this.routes.b.reset(this._setupRoutes(flights_b));
    }
    else {
      var flights = new App.Collections.Flights(_.flatten(this.connections.double.pluck('flights')));
      var flights_a = new App.Collections.Flights(flights.where({flight_order: 0}));
      var flights_b = new App.Collections.Flights(flights.where({flight_order: 1}));
      var flights_c = new App.Collections.Flights(flights.where({flight_order: 2}));
      flights_a.removeDuplicates()
      flights_b.removeDuplicates()
      flights_c.removeDuplicates()
      this.routes.a.reset(this._setupRoutes(flights_a));
      this.routes.b.reset(this._setupRoutes(flights_b));
      this.routes.c.reset(this._setupRoutes(flights_c));
    }
  },

  _setupRoutes: function(flights) {
    var routes = [];
    flights.each( function(flight) {
      var depart = moment(flight.get('departure_date'));
      var arrive = moment(flight.get('arrival_date'));
      model = new App.Models.Flight({
        arrival_date: arrive.format('YYYY-MM-DD'),
        arrival_time: arrive.format('HH:mm:ss'),
        departure_date: depart.format('YYYY-MM-DD'),
        departure_time: depart.format('HH:mm:ss'),
        flights: [flight],
      });
      routes.push(model);
    });
    return routes;
  },
});
