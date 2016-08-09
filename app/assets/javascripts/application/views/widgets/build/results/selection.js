App.View.extend({
  name: 'widgets/build/results/selection',
  attributes: {
    'class': 'build_results_selection',
  },
  data_source: [
    {key: 'legs', required: true},
    {key: 'selected_routes', required: false},
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'fetchRoutes',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, '_handleLegRoutes', '_handleSelectedRoute');
    var _this = this;
    this.components = {};
    this.selected_leg = new App.Model();
    this.selected_legs = new App.Collection();

    // For user route selection
    this.selected_route = new App.Models.Route();

    // For spinner
    this.spinner_control = new App.Model({load: true});
  },

  setupListeners: function() {
    var _this = this;

    this.listenTo(this.selected_legs, 'reset', function() {
      var leg = _this.selected_legs.first();
      if (leg) {
        var route = _this.data.selected_routes.findWhere({order: leg.get('order')});
        if (route) {
          _this.selected_route.set(route.attributes,{silent:true});
        }
        else {
          _this.selected_route.clear({silent:true});
        }
        _this.selected_leg.set(leg.attributes);
      }
    });

    this.listenTo(this.selected_route, 'change', this._handleSelectedRoute);
  },

  fetchRoutes: function() {
    var _this = this;
    var count = 0;
    this.data.legs.each( function(leg) {
      if (leg.has('routes')) {
        _this._handleLegRoutes(leg, ++count);
      }
      // If no routes then fetch
      else {
        var routes = new App.Collections.Routes()
        // Get the fetch attributes before setting routes
        var fetch_attrs = leg.clone().attributes;
        leg.set('routes', routes);
        leg.set('title', leg.get('departure')+' » '+leg.get('arrival'));
        _this.listenToOnce(routes, 'sync', function() {
          _this._handleLegRoutes(leg, ++count);
        });

        routes.fetch({data: fetch_attrs});
      }
    });
  },

  setupComponents: function() {
    this.components.spinner = {
      model: this.spinner_control,
      attribute: 'load',
    };

    this.components.select_leg = {
      collection: this.data.legs,
      selected: this.selected_legs,
      label_attr: 'title',
      title: 'Leg:',
    }

    this.components.connections = {
      leg: this.selected_leg,
      selected_route: this.selected_route,
    };

  },

  _handleLegRoutes: function(leg, count) {
    if (leg.get('order') == 0) {
      // Set selected route at order 0 (first route) if exists
      var sel_route = this.data.selected_routes.findWhere({order: 0});
      if (sel_route) {
        this.selected_route.set(sel_route.attributes, {silent: true});
      }
      // Set the selected leg at 0 (first legt)
      this.selected_leg.set(leg.attributes);
      this.selected_legs.add(leg);
    }
    // Turn off spinner if done fetching
    if (count == this.data.legs.length) {
      this.spinner_control.set('load', false);
    }
  },

  _handleSelectedRoute: function() {
    var route = this.data.selected_routes.findWhere({order: this.selected_leg.get('order')});
    if (!route) {
      route = new App.Models.Route({order: this.selected_leg.get('order')});
      this.data.selected_routes.add(route);
    }
    route.set(this.selected_route.attributes);
  },

});
