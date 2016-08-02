App.View.extend({
  name: 'widgets/build/results/connections',
  attributes: {
    'class': 'build_results_selection',
  },
  data_source: [
    {key: 'leg', required: true},
    {key: 'selected_route', required: false},
  ],
  init_functions: [
    'setup',
    'setupListeners',
  ],

  setup: function() {
    _.bindAll(this, '_changeLeg');
  },

  setupListeners: function() {
    this.listenTo(this.data.leg, 'change', this._changeLeg);
  },

  _changeLeg: function() {
    if (this.data.leg.has('routes')) {
      var direct_routes = this.data.leg.get('routes').where({num_legs: 1})
      var single_connection = this.data.leg.get('routes').where({num_legs: 2});
      var double_connection = this.data.leg.get('routes').where({num_legs: 3});

      console.log('counts:',direct_routes.length, single_connection.length, double_connection.length);
    }
  },
});
