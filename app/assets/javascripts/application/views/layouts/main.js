App.View.extend({
  name: 'layouts/main',
  dependencies: [
    "paper-drawer-panel/paper-drawer-panel.html",
    "paper-scroll-header-panel/paper-scroll-header-panel.html",
    "paper-toolbar/paper-toolbar.html",
    "paper-icon-button/paper-icon-button.html",
  ],
  events: {
    'click #page_title': '_navigateHome',
  },
  data_source: [
    {key: 'page', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {
    _.bindAll(this, '_navigateHome');
    var _this = this;
    this.components = {};
    this.display = {
      page_name: this.data.page.split('/')[1].capitalize(),
    };

    this.components.menu = {
      icon: 'menu',
      attributes: new App.Model({"paper-drawer-toggle": true, class: 'top'}),
    };

    if (_.isEqual(this.display.page_name, "Home")) {
      this.display.toolbar_class = "tall";
    }
  },

  _navigateHome: function() {
    window.location.pathname = "/";
  },
});
