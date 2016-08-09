App.View.extend({
  name: 'widgets/build/results/connections',
  attributes: {
    'class': 'build_results_connections',
  },
  data_source: [
    {key: 'leg', required: true},
    {key: 'selected_route', required: false},
  ],
  init_functions: [
    'setup',
    'setupSelected',
    'setupListeners',
    'setupComponents',
    '_splitConnections',
    '_setupConnectionCollection',
    '_setupConnectionRoutes',
  ],

  setup: function() {
    _.bindAll(this, '_changeLeg', 'setupSelected', '_splitConnections', '_setSelectedRoute', '_setupConnectionCollection', '_buildRoute');
    var _this = this;
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
    this.selected = [
      new App.Models.Route(),
      new App.Models.Route(),
      new App.Models.Route(),
    ];

    this.possible_connections = new App.Collection();
    this.selected_connections = new App.Collection();
  },

  setupSelected: function() {
    var _this = this;
    this.selected[0].clear({silent:true});
    this.selected[1].clear({silent:true});
    this.selected[2].clear({silent:true});

    if (this.data.selected_route.has('flights')) {
      _.each(this.data.selected_route.get('flights'), function(flight, index) {
        var route = _this._buildRoute([flight]);
        _this.selected[index].set(route.attributes);
      });
    }
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

    this.listenTo(this.selected[0], 'change', this._setSelectedRoute);
    this.listenTo(this.selected[1], 'change', this._setSelectedRoute);
    this.listenTo(this.selected[2], 'change', this._setSelectedRoute);
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
      selected_route: this.selected[0],
    };

    c.b_routes = {
      routes: this.routes.b,
      selected_route: this.selected[1],
    };

    c.c_routes = {
      routes: this.routes.c,
      selected_route: this.selected[2],
    };
  },

  _changeLeg: function() {
    this.setupSelected();
    this._splitConnections();
    this._setupConnectionCollection();
    this._setupConnectionRoutes();
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
      var flights = new App.Collections.Flights(_.flatten(this.connections.direct.pluck('flights')));
      this.routes.a.reset(this._setupRoutes(flights));
    }
    else if (this.show.single) {
      var flights = new App.Collections.Flights(_.flatten(this.connections.single.pluck('flights')));
      var flights_a = new App.Collections.Flights(flights.where({route_order: 0}));
      var flights_b = new App.Collections.Flights(flights.where({route_order: 1}));
      flights_a.removeDuplicates()
      flights_b.removeDuplicates()
      this.routes.a.reset(this._setupRoutes(flights_a));
      this.routes.b.reset(this._setupRoutes(flights_b));
    }
    else {
      var flights = new App.Collections.Flights(_.flatten(this.connections.double.pluck('flights')));
      var flights_a = new App.Collections.Flights(flights.where({route_order: 0}));
      var flights_b = new App.Collections.Flights(flights.where({route_order: 1}));
      var flights_c = new App.Collections.Flights(flights.where({route_order: 2}));
      flights_a.removeDuplicates()
      flights_b.removeDuplicates()
      flights_c.removeDuplicates()
      this.routes.a.reset(this._setupRoutes(flights_a));
      this.routes.b.reset(this._setupRoutes(flights_b));
      this.routes.c.reset(this._setupRoutes(flights_c));
    }
  },

  _setSelectedRoute: function() {
    var flights = _.reduce(this.selected, function(memo, route) {
      var f = route.get('flights');
      if (f && f.length > 0){
        memo.push(f);
      }
      return _.flatten(memo);
    }, []);

    var route = this._buildRoute(flights);
    this.data.selected_route.set(route.attributes);
  },

  _setupRoutes: function(flights) {
    var _this = this;
    var routes = [];
    flights.each( function(flight) {
      routes.push(_this._buildRoute([flight]));
    });
    return routes;
  },

  _buildRoute: function(flights) {
    var first, last;
    if (_.isArray(flights)) {
      first = _.first(flights);
      last = _.last(flights);
    }
    else {
      first = flights.first();
      last = flights.last;
    }

    var depart = moment(first.get('departure_date'));
    var arrive = moment(last.get('arrival_date'));
    var route = new App.Models.Flight({
      arrival_date: arrive.format('YYYY-MM-DD'),
      arrival_time: arrive.format('HH:mm:ss'),
      departure_date: depart.format('YYYY-MM-DD'),
      departure_time: depart.format('HH:mm:ss'),
      flights: flights,
    });
    return route;
  },
});
