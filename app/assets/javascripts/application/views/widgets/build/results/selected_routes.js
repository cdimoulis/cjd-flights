App.View.extend({
  name: 'widgets/build/results/selected_routes',
  attributes: {
    'class': 'build_results_selected_routes',
  },
  data_source: [
    {key: 'selected_routes', required: true},
  ],
  init_functions: [
    'setup',
    'setupListeners',
  ],

  setup: function() {
    _.bindAll(this, 'setupRoutes', 'addRoute', 'removeRoutes', 'removeRoute');
    this.route_views = {};
  },

  setupListeners: function() {
    this.listenTo(this, 'rendered', this.setupRoutes);
    this.listenTo(this.data.selected_routes,'add', this.setupRoutes);
    this.listenTo(this.data.selected_routes,'remove', this.removeRoute);
  },

  setupRoutes: function() {
    var _this = this;
    this.removeRoutes();
    this.data.selected_routes.each( function(route) {
      _this.addRoute(route);
    });
  },

  removeRoutes: function() {
    var _this = this;
    this.data.selected_routes.each( function(model) {
      _this.removeRoute(model);
    });
  },

  addRoute: function(model) {
    var c = {
      route: model,
    }
    this.route_views[model.cid] = this.addView('widgets/build/results/selected_route', c, this.$el.find('.routes'));
  },

  removeRoute: function(model) {
    if (_.has(this.route_views, model.cid)) {
      this.removeView(this.route_views[model.cid]);
    }
  },
});
