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
    console.log('routes',this.data.routes.pluck('flights'));
  },

  setupComponents: function() {
    var c = this.components;

    c.results = {
      text: "Results",
      icon: "arrow-back",
      event_handler: this.previous,
    };

    c.routes = {
      selected_routes: this.data.routes,
    };
  },
});
