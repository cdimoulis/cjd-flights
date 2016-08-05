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
    _.bindAll(this,'addRoute', 'removeRoute');
    this.route_views = {};
  },

  setupListeners: function() {
    this.listenTo(this.data.selected_routes,'add', this.addRoute);
    this.listenTo(this.data.selected_routes,'remove', this.removeRoute);
  },

  addRoute: function(model) {
    var c = {
      route: model,
    }
    this.route_views[model.cid] = this.addView('widgets/build/results/selected_route', c, this.$el.find('.routes'));
  },

  removeRoute: function(model) {
    this.removeView(this.route_view[model.cid])
  },
});
