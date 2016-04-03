App.View.extend({
  name: 'forms/airports/main',
  tagName: 'form',
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, 'save');
    this.airport = this.data.model;


  },

  setupComponents: function() {
    this.components = c = {};

    c.code = {
      model: this.airport,
      attribute: 'code',
      label: "Airport Code",
    };
  },

  save: function() {

  },
});
