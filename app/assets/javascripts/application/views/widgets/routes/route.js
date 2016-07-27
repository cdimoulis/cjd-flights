App.View.extend({
  name: 'widgets/routes/route',
  attributes: {
    'class': 'route_info',
  },
  data_source: [
    {key: 'model', required: true},
  ],
  init_functions: [
    'setup',
    'setupDisplay',
  ],

  setup: function() {
    this.display = {};
  },

  setupDisplay: function() {
    console.log(this.data.model.attributes);
  },
});
