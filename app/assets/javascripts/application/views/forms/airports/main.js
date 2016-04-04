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
    'setupTimezones',
    'setSelectedTimezone',
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
        _this.setSelectedTimezone();
      }
      else {
        _this.$el.find('span.edit').removeClass('active', 400);
        _this.$el.find('span.new').addClass('active', 400);
        _this.setSelectedTimezone();
      }
    });
  },

  setupTimezones: function() {
    var _this = this;
    this.selected_timezone = new App.Collection();
    this.listenTo(this.selected_timezone, 'reset', function() {
      tz = _this.selected_timezone.first();
      if (!!tz) {
        _this.airport.setTimezone(value, {silent: true});
      }
    })

    // Timezone collection for selection
    this.timezones = new App.Collection([
      {zone: "-12:00"},
      {zone: "-00:30"},
      {zone: "00:00"},
      {zone: "+00:30"},
      {zone: "+12:00"},
    ]);

    // Comparator to order properly
    this.timezones.comparator = function(a, b) {
      x = parseFloat(a.get('zone').replace(':', '.'));
      y = parseFloat(b.get('zone').replace(':', '.'));
      return x < y ? -1 : 1
    }

    // Build timezone collection
    var hour = 11;
    while (hour != 0) {
      z1 = moment(hour+':30','h:m').format('hh:mm');
      z2 = moment(hour+':00','h:m').format('hh:mm');

      this.timezones.add({zone: '+'+z1});
      this.timezones.add({zone: '-'+z1});
      this.timezones.add({zone: '+'+z2});
      this.timezones.add({zone: '-'+z2});

      hour--;
    }
  },

  setSelectedTimezone: function() {
    if (this.airport.has('timezone')) {
      tz = this.timezones.findWhere({zone: this.airport.getTimezone()});
      if (!!tz) {
        this.selected_timezone.add(tz);
      }
    }
    else {
      this.selected_timezone.reset();
    }
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

    c.timezone = {
      collection: this.timezones,
      attribute: 'zone',
      selected: this.selected_timezone,
      label: "Timezone",
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
