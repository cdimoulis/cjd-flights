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
    this.listenTo(this.selected_timezone, 'add', function() {
      tz = _this.selected_timezone.first();
      if (!!tz) {
        _this.airport.setTimezone(tz.get('zone'), {silent: true});
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
      attributes: new App.Model(),
      required: true,
      label: "Airport Code",
      required: true,
      error_message: "Required field",
    };

    c.name = {
      model: this.airport,
      attribute: 'text',
      attributes: new App.Model(),
      required: true,
      label: "Airport Name",
      required: true,
      error_message: "Required field",
    };

    c.city = {
      model: this.airport,
      attribute: 'city',
      attributes: new App.Model(),
      required: true,
      label: "City",
      required: true,
      error_message: "Required field",
    };

    c.state = {
      model: this.airport,
      attribute: 'state',
      attributes: new App.Model(),
      label: "State",
    };

    c.country = {
      model: this.airport,
      attribute: 'country',
      attributes: new App.Model(),
      label: "Country",
      required: true,
      error_message: "Required field",
    };

    c.timezone = {
      collection: this.timezones,
      attribute: 'zone',
      attributes: new App.Model(),
      selected: this.selected_timezone,
      required: true,
      label: "Timezone",
      required: true,
      error_message: "Required field",
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
    var _this = this;
    airport = this.airport.clone();

    this.listenToOnce(airport, 'sync', function(model) {
      _this.airport.set('id', model.get('id'));
      App.showSuccess("Airport saved");
      _this.airport.trigger('sync', model);
    });

    this.listenToOnce(airport, 'error', function() {
      console.log('error', arguments);
      App.showError('Airport cannot be saved');
    });

    airport.save();
  },
});
