App.View.extend({
  name: 'widgets/build/results/main',
  attributes: {
    'class': 'build_results',
  },
  data_source: [
    {key: 'legs', required: true},
    {key: 'next', required: true},
    {key: 'previous', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    this.components = {}
    this.selected_routes = new App.Collections.Routes();
    window.sel = this.selected_routes;
  },

  setupComponents: function() {
    var c = this.components;

    c.result_list = {
      legs: this.data.legs,
      selected_routes: this.selected_routes,
    };

    c.selected_flights = {

    };

  },
});
