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
    this.components = {};

    this.airports = new App.Collections.Airports();
    this.airports.fetch();
  },

  buildData: function() {

    this.components.list_airports = {
      collection: this.airports,
      view: 'widgets/airports/airport',
    };

  },
});
