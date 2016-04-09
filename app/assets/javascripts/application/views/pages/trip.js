App.Page.extend({
  name: "pages/trip",
  attributes: {
    'class': 'page_trip',
  },
  init_functions: [
    'setup',
    'buildData',
  ],

  setup: function() {
    this.components = {};
    this.trip = new App.Models.Trip()

    if (App.PageParams.has('trip')) {
      this.trip.set(App.PageParams.get('trip'));
    }
  },

  buildData: function() {
    this.components.flights = {
      model: this.trip,
    };

    this.components.info = {
      model: this.trip,
    };
  },
});
