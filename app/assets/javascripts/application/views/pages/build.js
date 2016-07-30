App.Page.extend({
  name: "pages/build",
  attributes: {
    'class': 'page_build',
  },
  init_functions: [
    'setup'
  ],

  setup: function() {
    this.components = c = {};
    this.routes = new App.Collections.Routes();

    c.legs = {
      routes: this.routes,
    };

    c.route_list = {
      routes: this.routes,
    };
  },
});
