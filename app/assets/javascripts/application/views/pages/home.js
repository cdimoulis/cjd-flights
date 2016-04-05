App.Page.extend({
  name: "pages/home",
  init_functions: [
    'setup',
  ],

  setup: function() {
    this.components = c = {};

    c.airports = {
      icon: 'device:airplanemode-active',
      attributes: new App.Model({class: 'background-accent'}),
      event_handler: function() {
        window.location.pathname = '/pages/airports';
      }
    };
  },
});
