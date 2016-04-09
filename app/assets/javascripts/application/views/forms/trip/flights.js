App.View.extend({
  name: 'forms/trip/flights',
  tagName: 'form',
  attributes: {
    'class': 'form_trip_flights',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {
    
  },

});
