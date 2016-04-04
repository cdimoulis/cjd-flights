App.Page.extend({
  name: "pages/airports",
  attributes: {
    'class': 'page_airports',
  },
  init_functions: [
    'setup',
    'buildData',
  ],

  setup: function() {
    var _this = this;
    this.components = {};

    this.selected_airport = new App.Models.Airport();

    this.airports = new App.Collections.Airports();
    this.airports.fetch();
  },

  buildData: function() {
    this.components.airport_list = {
      airports: this.airports,
      selected_airport: this.selected_airport,
    };
    
    this.components.form = {
      model: this.selected_airport,
    };
  },
});
