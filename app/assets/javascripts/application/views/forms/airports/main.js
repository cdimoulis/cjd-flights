App.View.extend({
  name: 'forms/airports/main',
  tagName: 'form',
  attributes: {
    'class': 'form_airports',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, 'clear', 'save');
    var _this = this;
    this.airport = this.data.model;

    // Determine if this is new or edit
    this.listenTo(this.airport, 'change', function() {
      if (_this.airport.has('id')) {
        _this.$el.find('span.edit').addClass('active', 400);
        _this.$el.find('span.new').removeClass('active', 400);
      }
      else {
        _this.$el.find('span.edit').removeClass('active', 400);
        _this.$el.find('span.new').addClass('active', 400);
      }
    });
  },

  setupComponents: function() {
    this.components = c = {};

    c.code = {
      model: this.airport,
      attribute: 'code',
      label: "Airport Code",
    };

    c.name = {
      model: this.airport,
      attribute: 'text',
      label: "Airport Name",
    };

    c.city = {
      model: this.airport,
      attribute: 'city',
      label: "City",
    };

    c.state = {
      model: this.airport,
      attribute: 'state',
      label: "State",
    };

    c.country = {
      model: this.airport,
      attribute: 'country',
      label: "Country",
    };

    c.clear = {
      text: 'clear',
      attributes: new App.Model({class: 'background-accent'}),
      event_handler: this.clear,
    };

    c.save = {
      text: 'save',
      attributes: new App.Model({class: 'background-primary'}),
      event_handler: this.save,
    };
  },

  clear: function() {
    this.airport.clear();
  },

  save: function() {

  },
});
