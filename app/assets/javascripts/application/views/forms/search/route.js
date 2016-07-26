App.View.extend({
  name: 'forms/search/route',
  tagName: 'form',
  attributes: {
    'class': 'form_flight',
  },
  data_source: [
    {key: 'routes', required: true}
  ],
  init_functions: [
    'setup',
    // 'setupListeners',
    'setupComponents',
  ],

  setup: function() {
    this.routes = this.data.routes;
    this.search_data = new App.Model();

  },

  setupComponents: function() {
    this.components = c = {};

    c.departure = {
      model: this.search_data,
      attribute: 'departure',
      required: true,
      label: "Departure Airport",
      error_message: "Required Field",
    };

    c.arrival = {
      model: this.search_data,
      attribute: 'arrival',
      required: true,
      label: "Arrival Airport",
      error_message: "Required Field",
    };

    c.date = {
      model: this.search_data,
      attribute: 'date',
      required: true,
      label: "Departure Date",
      error_message: "Required Field",
      label: "Departure Date",
    };
  },
});
