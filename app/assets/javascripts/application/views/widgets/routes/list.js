App.View.extend({
  name: 'widgets/routes/list',
  attributes: {
    'class': 'route_list',
  },
  data_source: [
    {key: 'routes', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    var _this = this;
    this.components = {};
  },

  setupComponents: function() {
    this.components.list_routes = {
      collection: this.data.routes,
      view: 'widgets/routes/route',
      view_data: {

      },
    };

  },
});
