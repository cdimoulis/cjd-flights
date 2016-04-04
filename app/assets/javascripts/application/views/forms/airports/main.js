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

  setupTimezones: function() {
    this.selected_timezone = new App.Model();
    this.timezones = new App.Collection([
      {zone: "-12:00"},
      {zone: "12:00"},
      {zone: "00:00"},
      {zone: "00:30"},
      {zone: "-00:30"},
    ]);
    this.timezones.comparator = function(a, b) {
      x = parseInt(a.get('zone'));
      y = parseInt(b.get('zone'));

      if (x == y) {
        if (b.get('zone').split(':')[1] == '30') {
          return x < 0 ? 1 : -1
        }

        if (a.get('zone').split(':')[1] == '30') {
          return x < 0 ? -1 : 1
        }
      }
      else {
        return x < y ? -1 : 1
      }
    }

    var hour = 11;

    while (hour != 0) {
      z1 = moment(hour+':30','h:m').format('hh:mm');
      z2 = moment(hour+':00','h:m').format('hh:mm');

      if (hour != 0) {
        this.timezones.add({zone: z1});
        this.timezones.add({zone: '-'+z1});
        this.timezones.add({zone: z2});
        this.timezones.add({zone: '-'+z2});
      }
      hour--;
    }
    window.timezones = this.timezones;
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
