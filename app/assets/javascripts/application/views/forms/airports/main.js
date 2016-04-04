App.View.extend({
  name: 'forms/airports/main',
  tagName: 'form',
  attributes: {
    'class': 'form_airports',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, 'save');
    var _this = this;
    this.airport = this.data.model;

    // Determine if this is new or edit
    this.listenTo(this.airport, 'change', function() {
      if (_this.airport.has('id')) {
        _this.$el.find('span.edit').addClass('active', 400);
        _this.$el.find('span.new').removeClass('active', 400);
      }
      else {
        _this.$el.find('span.edit').removeClass('active', 400);
        _this.$el.find('span.new').addClass('active', 400);
      }
    });
  },

  setupComponents: function() {
    this.components = c = {};

    c.code = {
      model: this.airport,
      attribute: 'code',
      label: "Airport Code",
    };
  },

  clear: function() {

  },

  save: function() {

  },
});
