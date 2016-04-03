App.View.extend({
  name: 'widgets/airports/airport',
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {

    this.airport = this.data.model;
  },
});
