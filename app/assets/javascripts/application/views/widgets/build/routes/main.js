App.View.extend({
  name: 'widgets/build/routes/main',
  attributes: {
    'class': 'build_routes_main',
  },
  data_source: [
    {key: 'legs', required: true},
    {key: 'next', required: true},
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, '_addLeg')
    var _this = this;
    this.components = {};
    this.legs = this.data.legs;

    if (this.legs.length == 0) {
      this.legs.add(new App.Model({order: 0, group: 0}));
    }
    window.legs = this.legs;
  },

  setupListeners: function() {
    var _this = this;
    this.listenTo(this.legs, 'remove', function(model) {
      // If leg is removed, shift the order of any after
      var done = false;
      var order = model.get('order');
      var next = _this.legs.findWhere({order: order+1});

      while (next) {
        next.set('order', order);
        order++;
        next = _this.legs.findWhere({order: order+1});
      }
    });
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

    c.search = {
      text: 'Search',
      button_color: 'accent',
      icon: 'search',
      event_handler: this.data.next,
    };

  },

  _addLeg: function() {
    var last = this.legs.last()
    var model = new App.Model({order: last.get('order')+1, group: last.get('group')+1})
    this.legs.add(model);
  },
});
