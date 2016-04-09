App.Page.extend({
  name: "pages/trip",
  attributes: {
    'class': 'page_trip',
  },
  init_functions: [
    'setup',
  ],

  setup: function() {
    console.log('a trip');
  },

});
