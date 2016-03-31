App.View.extend({
  name: 'layouts/main',
  dependencies: [
    "paper-drawer-panel/paper-drawer-panel.html",
    "paper-scroll-header-panel/paper-scroll-header-panel.html",
    "paper-toolbar/paper-toolbar.html",
    "paper-icon-button/paper-icon-button.html",
  ],
  attributes: {
    style: 'height: 100%;'
  },
  events: {
    'click #title': '_navigateHome',
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

    this.components.menu = {
      icon: 'menu',
      attributes: new App.Model({"paper-drawer-toggle": true, class: 'top'}),
    };
  },

  _navigateHome: function() {
    window.location.pathname = "/";
  },
});
