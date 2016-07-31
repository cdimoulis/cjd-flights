App.Page.extend({
  name: "pages/build",
  attributes: {
    'class': 'page_build',
  },
  init_functions: [
    'setup'
  ],

  setup: function() {
    _.bindAll(this, '_searchRoutes');
    this.components = c = {};
    this.routes = new App.Collections.Routes();
    this.legs = new App.Collection()

    c.legs = {
      legs: this.legs,
    };

    c.route_list = {
      routes: this.routes,
    };

    c.search = {
      text: 'Search',
      button_color: 'accent',
      icon: 'search',
      event_handler: this._searchRoutes,
    };
  },

  _searchRoutes: function() {
    this.legs.each(function(leg) {
      console.log(leg.attributes);
    });
  },
});
