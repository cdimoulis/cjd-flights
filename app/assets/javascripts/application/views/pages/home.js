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

    c.trip = {
      icon: 'card-travel',
      attributes: new App.Model({class: 'background-accent'}),
      event_handler: function() {
        window.location.pathname = '/pages/trip';
      }
    };

    c.build = {
      icon: 'flight-takeoff',
      attributes: new App.Model({class: 'background-accent'}),
      event_handler: function() {
        window.location.pathname = '/pages/build';
      }
    };
  },
});
