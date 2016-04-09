App.View.extend({
  name: 'forms/trip/info',
  tagName: 'form',
  attributes: {
    'class': 'form_trip_info',
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
