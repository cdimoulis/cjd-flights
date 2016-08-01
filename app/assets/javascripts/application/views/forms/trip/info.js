App.View.extend({
  name: 'forms/trip/info',
  tagName: 'form',
  attributes: {
    'class': 'form_trip_info',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {
    this.components = c = {};

    c.name = {
      model: this.data.model,
      attribute: 'text',
      attributes: new App.Model(),
      label: "Trip Name",
      required: true,
      error_message: "Required field",
    };

    c.price = {
      model: this.data.model,
      attribute: 'text',
      attributes: new App.Model(),
      label: "Price",
      icon_prefix: 'editor:attach-money',
      pattern: "numeric_positive",
      error_message: "Must be a number",
    };

    c.first = {
      model: this.data.model,
      attribute: 'cabin',
      value: 'First',
      label: 'First',
    };

    c.coach = {
      model: this.data.model,
      attribute: 'cabin',
      value: 'Coach',
      label: 'Coach',
    };

    c.round_trip = {
      model: this.data.model,
      attribute: 'trip_type',
      value: 'roundTrip',
      label: 'Round Trip',
    };

    c.one_way = {
      model: this.data.model,
      attribute: 'trip_type',
      value: 'oneWay',
      label: 'One Way',
    };

    c.multi_city = {
      model: this.data.model,
      attribute: 'trip_type',
      value: 'multiCity',
      label: 'Multi City',
    };


  },

});
