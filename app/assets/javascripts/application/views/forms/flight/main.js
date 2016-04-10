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
    'setupListeners',
    'setupComponents',
  ],

  setup: function() {
    this.flight = this.data.model;
    this.airlines = new App.Collections.Airlines(App.PageParams.get('airlines'));

    this.selected_airline = new App.Collections.Airlines()
    if (this.flight.has('airline_id')) {
      this.selected_airline.add(this.airlines.get(this.flight.get('airline_id')));
    }

  },

  setupListeners: function() {
    var _this = this;

    this.listenTo(this.selected_airline, 'change', function(model) {
      airline = this.selected_airline.first();
      if (!!airline && airline.has('id')) {
        _this.flight.set('airline_id', airline.get('id'));
      }
    });
  },

  setupComponents: function() {
    this.components = c = {};

    c.airline = {
      collection: this.airlines,
      attribute: 'code',
      selected: this.selected_airline,
      required: true,
      error_message: 'Airline Required',
    };

  },
});
