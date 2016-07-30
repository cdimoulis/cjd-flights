App.View.extend({
  name: 'forms/search/leg',
  tagName: 'form',
  attributes: {
    'class': 'form_leg',
  },
  data_source: [
    {key: 'model', required: true},
    {key: 'legs', required: true}
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupComponents',
  ],

  setup: function() {
    this.leg = this.data.model;
    this.leg.set('departure_time', 'N/A');

    this.direct = new App.Model({
      direct: false,
    });

  },

  setupListeners: function() {
    var _this = this;

    this.listenTo(this.direct, 'change:direct', function(model,value) {
      if (value) {
        _this.leg.set('departure_time', 'D');
      }
      else {
        _this.leg.set('departure_time', 'N/A');
      }
    });
  },

  setupComponents: function() {
    this.components = c = {};

    c.departure = {
      model: this.leg,
      attribute: 'departure',
      required: true,
      label: "Departure",
      error_message: "Required Field",
    };

    c.arrival = {
      model: this.leg,
      attribute: 'arrival',
      required: true,
      label: "Arrival",
      error_message: "Required Field",
    };

    c.date = {
      model: this.leg,
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
  },

});
