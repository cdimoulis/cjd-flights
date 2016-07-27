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

    // For spinner
    this.spinner_control = new App.Model({load: false});

    this.listenTo(this.data.routes, 'sync', function() {
      _this.spinner_control.set('load', false);
    });
  },

  setupComponents: function() {
    this.components.spinner = {
      model: this.spinner_control,
      attribute: 'load',
    }

    this.components.list_routes = {
      collection: this.data.routes,
      view: 'widgets/routes/route',
      view_data: {

      },
    };

  },
});
