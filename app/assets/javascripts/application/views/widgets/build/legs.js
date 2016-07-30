App.View.extend({
  name: 'widgets/build/legs',
  attributes: {
    'class': 'build_legs',
  },
  data_source: [
    {key: 'routes', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, '_addLeg', '_searchRoutes')
    var _this = this;
    this.components = {};
    this.legs = new App.Collection([new App.Model()]);

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

    c.search = {
      text: 'Search',
      button_color: 'accent',
      icon: 'search',
      event_handler: this._searchRoutes,
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

  _searchRoutes: function() {
    this.legs.each(function(leg) {
      console.log('leg', leg.attributes);
    });
  },
});
