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
    // 'setupLegComponents',
    'setupComponents',
    'searchRoutes',
  ],

  setup: function() {
    _.bindAll(this, '_selectLeg')// '_addLegRoute', '_addLeg');
    var _this = this;
    this.components = {};
    // this.leg_routes = new App.Collection();
    this.view_routes = new App.Collections.Routes();
    this.selected_leg = this.data.legs.findWhere({order: 0});

    // this.leg_routes.comparator = function(a,b) {
    //   if (a.get('order') < b.get('order')) {
    //     return -1;
    //   }
    //   else {
    //     return 1;
    //   }
    // }

    // For spinner
    this.spinner_control = new App.Model({load: true});

    this.listenTo(this.data.airports, 'sync', function() {
      _this.spinner_control.set('load', false);
    });
  },

  setupListeners: function() {
    var _this = this;
    // this.listenTo(this.leg_routes, 'add', this._addLeg);

    this.listenTo(this.selected_leg, 'change', this._selectLeg);
  },

  // setupLegComponents: function() {
  //   var _this = this;
  //
  //   this.components.spinner = {
  //     model: this.spinner_control,
  //     attribute: 'load',
  //   };
  //
  //   this.components.legs = [];
  //
  //   this.leg_routes.each( function(leg) {
  //     var selected = leg.get('order')==0;
  //     c = {
  //       text: leg.get('departure')+'-'+leg.get('arrival'),
  //       raised: false,
  //       button_color: leg.get('order')==0 ? 'primary' : 'accent',
  //       event_handler: function() {
  //         _this._selectLeg(leg.get('order'));
  //       },
  //       attributes: new App.Model({'data-index': leg.get('order'), 'selected': selected}),
  //     }
  //     _this.components.legs.push(c);
  //   });
  //
  // },

  setupComponents: function() {
    this.components.select_leg = {
      legs: this.data.legs,
      selected_leg: this.selected_leg,
    }

    this.components.list_routes = {
      routes: this.view_routes,
    };

  },

  searchRoutes: function() {
    var _this = this;
    var count = 0;
    this.data.legs.each( function(leg) {
      var routes = new App.Collections.Routes()
      leg.set('routes', routes);
      _this.listenToOnce(routes, 'sync', function() {
        if (leg.get('order') == this.select_leg.get('order')) {
          this.view_routes.reset(leg.get('routes').models)
        }
        // _this._addLegRoute(leg, routes, index);
        count++;

        // Turn off spinner if done fetching
        if (count == _this.data.legs.length) {
          _this.spinner_control.set('load', false);
        }
      })

      routes.fetch({data: leg.attributes});
    });
  },

  // _addLegRoute: function(leg, routes, order) {
  //   var leg_clone = leg.clone()
  //   leg_clone.set('routes', routes);
  //   leg_clone.set('order', order);
  //   this.leg_routes.add(leg_clone);
  // },

  // _addLeg: function(model) {
  //   if (model.get('order') == this.select_leg.get('order')) {
  //     this.view_routes.reset(model.get('routes').models)
  //   }
  //   // this.setupLegComponents();
  //   // this.render();
  // },

  _selectLeg: function(model) {
    this.view_routes.reset(model.get('routes').models);
  }
});
