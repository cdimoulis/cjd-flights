App.Page.extend({
  name: "pages/airports",
  init_functions: [
    'setup',
    'buildData',
  ],

  setup: function() {
    this.data = d = {};

    this.airports = new App.Collections.Airports();
    this.airports.fetch();
    window.airports = this.airports;
  },

  buildData: function() {

    d.list_airports = {
      collection: this.airports,
      view: 'widgets/airports/airport',
    };

  },
});
