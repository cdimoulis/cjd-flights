App.Page.extend({
  name: "pages/home",
  init_functions: [
    'setup',
  ],

  setup: function() {
    this.components = c = {};

    c.icon = {
      icon: 'flight-takeoff',
      attributes: new App.Model({class: 'background-accent'}),
    };
  },
});
