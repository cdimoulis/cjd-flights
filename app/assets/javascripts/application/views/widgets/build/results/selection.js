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
    _.bindAll(this, 'handleSelectedRoute');
    var _this = this;
    this.components = {};
    this.view_routes = new App.Collections.Routes();
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

    this.listenTo(this.selected_route, 'change', this.handleSelectedRoute);
  },

  fetchRoutes: function() {
    var _this = this;
    var count = 0;
    this.data.legs.each( function(leg) {
      var routes = new App.Collections.Routes()
      // Get the fetch attributes before setting routes
      var fetch_attrs = leg.clone().unset('routes').attributes;
      leg.set('routes', routes);
      leg.set('title', leg.get('departure')+' » '+leg.get('arrival'));
      _this.listenToOnce(routes, 'sync', function() {
        if (leg.get('order') == 0) {
          _this.selected_leg.set(leg.attributes);
          _this.selected_legs.add(leg);
          _this.view_routes.reset(leg.get('routes').models)
        }

        count++;
        // Turn off spinner if done fetching
        if (count == _this.data.legs.length) {
          _this.spinner_control.set('load', false);
        }
      });

      routes.fetch({data: fetch_attrs});
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

  handleSelectedRoute: function() {
    var route = this.data.selected_routes.findWhere({order: this.selected_leg.get('order')});
    if (!route) {
      route = new App.Models.Route({order: this.selected_leg.get('order')});
      this.data.selected_routes.add(route);
    }
    route.set(this.selected_route.attributes);
  },

});
