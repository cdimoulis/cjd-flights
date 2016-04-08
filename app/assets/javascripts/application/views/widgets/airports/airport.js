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
    'setupDisplay',
    'setupEdit',
  ],

  setup: function() {
    // console.log('setup airport')
    this.components = {};
    this.display = {};
    this.airport = this.data.model;

    // Listen for model changes
    this.listenTo(this.airport, 'change', function() {
      this.setupDisplay();
      this.render()
    });
  },

  setupDisplay: function() {
    this.display.code = this.airport.get('iata');
    this.display.text = this.airport.get('text');

    this.display.location = this.airport.get('city');
    if (this.airport.has('state')) {
      this.display.location += ', '+this.airport.get('state');
    }
    this.display.location += ', '+this.airport.get('country');

    this.display.tz = this.airport.getTimezone();

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
