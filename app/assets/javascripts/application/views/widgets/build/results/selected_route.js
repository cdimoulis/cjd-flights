App.View.extend({
  name: 'widgets/build/results/selected_route',
  attributes: {
    'class': 'build_results_selected_route',
  },
  data_source: [
    {key: 'route', required: true},
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupComponents',
  ],

  setup: function() {
    this.components = {};
    this.flights = new App.Collections.Flights(this.data.route.get('flights'));
  },

  setupListeners: function () {
    this.listenTo(this.data.route, 'change', function() {
      this.flights.reset(this.data.route.get('flights'));
    });
  },

  setupComponents: function() {
    var c = this.components;

    c.list = {
      collection: this.flights,
      view: 'widgets/routes/flight',
      view_data: {

      },
    };
  },
});
