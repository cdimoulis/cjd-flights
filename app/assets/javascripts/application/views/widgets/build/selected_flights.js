App.View.extend({
  name: 'widgets/build/selected_flights',
  attributes: {
    'class': 'build_selected_flights',
  },
  data_source: [
    // {key: 'legs', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {

  },
});
