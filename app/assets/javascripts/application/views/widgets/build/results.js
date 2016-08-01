App.View.extend({
  name: 'widgets/build/results',
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
  },

  setupComponents: function() {
    var c = this.components;

    c.result_list = {
      legs: this.data.legs,
    };

  },
});
