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

    this.listenTo(this.data.airports, 'sync', function() {
      _this.result_airports.reset(_this.data.airports.models);
    });

    this.data.airports.fetch();
  },

  setupComponents: function() {
    this.components.search = {
      collection: this.data.airports,
      results: this.result_airports,
      search_attributes: ['iata', 'text', 'city', 'state', 'country'],
    };

    this.components.list_airports = {
      collection: this.result_airports,
      view: 'widgets/airports/airport',
      view_data: {
        selected_airport: this.data.selected_airport,
      },
    };

  },
});
