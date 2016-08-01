App.View.extend({
  name: 'widgets/build/results',
  attributes: {
    'class': 'route_build',
  },
  data_source: [
    {key: 'legs', required: true},
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupLegComponents',
    'setupListComponent',
    'searchRoutes',
  ],

  setup: function() {
    _.bindAll(this, '_addLegRoute', '_addLeg');
    var _this = this;
    this.components = {};
    this.leg_routes = new App.Collection();
    this.view_routes = new App.Collections.Routes();

    this.leg_routes.comparator = function(a,b) {
      if (a.get('order') < b.get('order')) {
        return -1;
      }
      else {
        return 1;
      }
    }
  },

  setupListeners: function() {
    var _this = this;
    this.listenTo(this.leg_routes, 'add', this._addLeg);
  },

  setupLegComponents: function() {
    var _this = this;
    this.components.legs = [];

    this.leg_routes.each( function(leg) {
      var selected = leg.get('order')==0;
      c = {
        text: leg.get('departure')+'-'+leg.get('arrival'),
        raised: false,
        button_color: leg.get('order')==0 ? 'primary' : 'accent',
        event_handler: function() {
          _this._selectLeg(leg.get('order'));
        },
        attributes: new App.Model({'data-index': leg.get('order'), 'selected': selected}),
      }
      _this.components.legs.push(c);
    });

  },

  setupListComponent: function() {
    this.components.list_routes = {
      collection: this.view_routes,
      view: 'widgets/routes/route',
      view_data: {

      },
    };

  },

  searchRoutes: function() {
    var _this = this;
    this.data.legs.each( function(leg, index) {
      var routes = new App.Collections.Routes()
      _this.listenToOnce(routes, 'sync', function() {
        _this._addLegRoute(leg, routes, index);
      })

      routes.fetch({data: leg.attributes});
    });
  },

  _addLegRoute: function(leg, routes, order) {
    var leg_clone = leg.clone()
    leg_clone.set('routes', routes);
    leg_clone.set('order', order);
    this.leg_routes.add(leg_clone);
  },

  _addLeg: function(model) {
    if (model.get('order') == 0) {
      this.view_routes.reset(model.get('routes').models)
    }
    this.setupLegComponents();
    this.render();
  },

  _selectLeg: function(index) {
    var $o_sel = this.$el.find('paper-button[selected]');
    var $n_sel = this.$el.find('paper-button[data-index='+index+']');
    $o_sel.removeAttr('selected');
    $o_sel.removeClass('background-primary');
    $o_sel.addClass('background-accent');
    $n_sel.attr('selected', true);
    $n_sel.removeClass('background-accent');
    $n_sel.addClass('background-primary');

    var leg = this.leg_routes.findWhere({order: index});
    this.view_routes.reset(leg.get('routes').models);
  }
});
