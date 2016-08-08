App.View.extend({
  name: 'widgets/build/trip/main',
  attributes: {
    'class': 'build_trip',
  },
  data_source: [
    {key: 'routes', required: true},
    {key: 'previous', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    this.components = {};
  },

  setupComponents: function() {
    var c = this.components;

    c.results = {
      text: "Results",
      icon: "arrow-back",
      event_handler: this.data.previous,
    };

    c.routes = {
      selected_routes: this.data.routes,
    };
  },
});
