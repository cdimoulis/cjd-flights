App.View.extend({
  name: 'widgets/airports/airport',
  attributes: {
    'class': 'airport_info',
  },
  data_source: [
    {key: 'model', required: true},
    {key: 'selected_airport', required: true},
  ],
  init_functions: [
    'setup',
    'setupEdit',
  ],

  setup: function() {
    this.components = {};
    this.display = {};
    this.airport = this.data.model;

    this.display.location = this.airport.get('city');
    if (this.airport.has('state')) {
      this.display.location += ', '+this.airport.get('state');
    }
    this.display.location += ', '+this.airport.get('country');

    this.display.tz = this.airport.getTimeZone();

    // Listen for model changes
    this.listenTo(this.airport, 'change', this.render);
  },

  setupEdit: function() {
    var _this = this;
    this.components.edit = {
      icon: 'image:edit',
      attributes: new App.Model({'class': 'background-accent'}),
      mini: true,
      event_handler: function() {
        _this.data.selected_airport.set(_this.airport.attributes);
      },
    };
  },
});
