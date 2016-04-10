App.View.extend({
  name: 'forms/flight/main',
  tagName: 'form',
  attributes: {
    'class': 'form_flight',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    this.flight = this.model;

  },

  setupComponents: function() {
    this.components = c = {};

    
  },
});
