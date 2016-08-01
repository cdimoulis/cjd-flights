App.View.extend({
  name: 'widgets/build/results/selection',
  attributes: {
    'class': 'build_results_selection',
  },
  data_source: [
    {key: 'legs', required: true},
    {key: 'selected_flights', required: false},
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupComponents',
    'fetchRoutes',
  ],

  setup: function() {
    _.bindAll(this, '_selectLeg')
    var _this = this;
    this.components = {};
    this.view_routes = new App.Collections.Routes();
    this.selected_leg = this.data.legs.findWhere({order: 0}).clone();

    // For spinner
    this.spinner_control = new App.Model({load: true});

    this.listenTo(this.data.airports, 'sync', function() {
      _this.spinner_control.set('load', false);
    });
  },

  setupListeners: function() {
    var _this = this;

    this.listenTo(this.selected_leg, 'change', this._selectLeg);
  },

  setupComponents: function() {
    this.components.spinner = {
      model: this.spinner_control,
      attribute: 'load',
    };

    this.components.select_leg = {
      legs: this.data.legs,
      selected_leg: this.selected_leg,
    }

    this.components.list_routes = {
      routes: this.view_routes,
    };

  },

  fetchRoutes: function() {
    var _this = this;
    var count = 0;
    this.data.legs.each( function(leg) {
      var routes = new App.Collections.Routes()
      // Get the fetch attributes before setting routes
      var fetch_attrs = leg.clone().attributes;
      leg.set('routes', routes);
      _this.listenToOnce(routes, 'sync', function() {
        if (leg.get('order') == this.selected_leg.get('order')) {
          this.view_routes.reset(leg.get('routes').models)
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

  _selectLeg: function(model) {
    this.view_routes.reset(model.get('routes').models);
  }
});
