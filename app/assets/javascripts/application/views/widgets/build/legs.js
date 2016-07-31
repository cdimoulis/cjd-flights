App.View.extend({
  name: 'widgets/build/legs',
  attributes: {
    'class': 'build_legs',
  },
  data_source: [
    {key: 'legs', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, '_addLeg')
    var _this = this;
    this.components = {};
    this.legs = this.data.legs;

    if (this.legs.length == 0) {
      this.legs.add(new App.Model());
    }

  },

  setupComponents: function() {
    var c = this.components;

    c.list_legs = {
      collection: this.legs,
      view: 'forms/search/leg',
      view_data: {
        legs: this.legs
      },
    };

    c.add = {
      text: 'Add Leg',
      button_color: 'primary',
      icon: 'add',
      event_handler: this._addLeg,
    };

  },

  _addLeg: function() {
    this.legs.add(new App.Model());
  },
});
