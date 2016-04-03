App.Page.extend({
  name: "pages/airports",
  attributes: {
    'class': 'page_airports',
  },
  init_functions: [
    'setup',
    'buildData',
    'setupForm',
  ],

  setup: function() {
    this.components = {};

    this.selected_airport = new App.Models.Airport();

    this.airports = new App.Collections.Airports();
    this.airports.fetch();
  },

  buildData: function() {

    this.components.list_airports = {
      collection: this.airports,
      view: 'widgets/airports/airport',
      view_data: {
        selected_airport: this.selected_airport,
      },
    };
  },

  setupForm: function() {
    this.components.form = {
      model: this.selected_airport,
    };
  },
});
