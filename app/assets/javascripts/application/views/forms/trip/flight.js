App.View.extend({
  name: 'forms/trip/flight',
  tagName: 'form',
  attributes: {
    'class': 'form_trip_flight',
  },
  data_source: [
    {key: 'model', required: true},
    {key: 'selected_flight', required: true},
  ],
  init_functions: [
    'setup',
    'setupForm',
  ],

  setup: function() {
    this.flight = this.data.model;
    this.selected_flight = this.data.selected_flight;

  },

  setupForm: function() {
    this.formst = f = {};

    f.flight = {
      model: this.flight,
    };
  },
});
