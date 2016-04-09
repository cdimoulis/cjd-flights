App.View.extend({
  name: 'widgets/airports/airport_list',
  attributes: {
    'class': 'airport_list',
  },
  data_source: [
    {key: 'airports', required: true},
    {key: 'selected_airport', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    var _this = this;
    this.components = {};
    this.result_airports = new App.Collections.Airports(this.data.airports.models);

    // In case the selected airport collection is synced
    this.listenTo(this.data.selected_airport, 'sync', function(model) {
      _this.data.selected_airport.set('id', model.get('id'));
      airport = _this.data.airports.get(model.get('id'))
      if (!airport) {
        _this.data.airports.add(model);
      }
      else {
        airport.set(model.attributes);
      }
    });

    // For spinner
    this.spinner_control = new App.Model({load: true});

    this.listenTo(this.data.airports, 'sync', function() {
      _this.spinner_control.set('load', false);
    });

    this.data.airports.fetch();
  },

  setupComponents: function() {
    this.components.search = {
      collection: this.data.airports,
      results: this.result_airports,
      search_attributes: ['iata', 'text', 'city', 'state', 'country'],
    };

    this.components.spinner = {
      model: this.spinner_control,
      attribute: 'load',
    }

    this.components.list_airports = {
      collection: this.result_airports,
      view: 'widgets/airports/airport',
      view_data: {
        selected_airport: this.data.selected_airport,
      },
    };

  },
});
