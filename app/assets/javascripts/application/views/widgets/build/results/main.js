App.View.extend({
  name: 'widgets/build/results/main',
  attributes: {
    'class': 'build_results',
  },
  data_source: [
    {key: 'legs', required: true},
    {key: 'selected_routes', required: true},
    {key: 'next', required: true},
    {key: 'previous', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    this.components = {}
  },

  setupComponents: function() {
    var c = this.components;

    c.modify = {
      text: "Modify Routes",
      icon: 'arrow-back',
      event_handler: this.data.previous,
    };

    c.flights = {
      text: "View Flights",
      icon: 'arrow-forward',
      pre_icon: false,
      event_handler: this.data.next,
    };

    c.selection = {
      legs: this.data.legs,
      selected_routes: this.data.selected_routes,
    };

    c.selected_routes = {
      selected_routes: this.data.selected_routes,
    };

  },
});
