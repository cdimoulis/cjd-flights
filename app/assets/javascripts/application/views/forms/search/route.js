App.View.extend({
  name: 'forms/search/route',
  tagName: 'form',
  attributes: {
    'class': 'form_route',
  },
  data_source: [
    {key: 'routes', required: true}
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, '_searchRoutes');
    this.routes = this.data.routes;
    this.search_data = new App.Model({
      departure_time: "N/A",
    });
    this.direct = new App.Model({
      direct: false,
    });

  },

  setupListeners: function() {
    var _this = this;

    this.listenTo(this.direct, 'change:direct', function(model,value) {
      if (value) {
        _this.search_data.set('departure_time', 'D');
      }
      else {
        _this.search_data.set('departure_time', 'N/A');
      }
    });
  },

  setupComponents: function() {
    this.components = c = {};

    c.departure = {
      model: this.search_data,
      attribute: 'departure',
      required: true,
      label: "Departure",
      error_message: "Required Field",
    };

    c.arrival = {
      model: this.search_data,
      attribute: 'arrival',
      required: true,
      label: "Arrival",
      error_message: "Required Field",
    };

    c.date = {
      model: this.search_data,
      attribute: 'date',
      required: true,
      label: "Date",
      error_message: "Required Field",
      label: "Departure Date",
      future_date: moment().add(1, 'year').format("YYYY-MM-DD"),
    };

    c.direct = {
      model: this.direct,
      attribute: 'direct',
      label: "Direct",
    };

    c.search = {
      text: 'Search',
      button_color: 'accent',
      icon: 'search',
      event_handler: this._searchRoutes,
    };
  },

  _searchRoutes: function() {
    this.routes.fetch({data: this.search_data.attributes})
  },
});
