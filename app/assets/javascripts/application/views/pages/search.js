App.Page.extend({
  name: "pages/search",
  attributes: {
    'class': 'page_search',
  },
  init_functions: [
    'setup'
  ],

  setup: function() {
    this.components = c = {};
    this.routes = new App.Collection();

    c.search_route = {
      routes: this.routes
    };

  },
});
