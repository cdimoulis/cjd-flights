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
    this.possible_connections = new App.Collection();
    this.selected_connections = new App.Collection();
    this.routes = new App.Collections.Routes();
  },

  setupListeners: function() {
    this.listenTo(this.data.leg, 'change', this._changeLeg);
  },

  setupComponents: function() {
    var c = this.components;
    c.select_connection = {
      collection: this.possible_connections,
      selected: this.selected_connections,
      label_attr: 'text',
      title: 'Connections:',
    }

    c.list_routes = {
      routes: this.routes,
    };
  },

  _changeLeg: function() {
    this._splitConnections();
    this._setupConnectionCollection();
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
      this.routes.reset(this.data.leg.get('routes').models);
    }
    else {
      this.selected_connections.reset([]);
      this.possible_connections.reset([]);
      this.routes.reset([]);
    }
  },
});
