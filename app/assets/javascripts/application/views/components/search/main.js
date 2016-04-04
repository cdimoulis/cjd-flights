App.View.extend({
  name: 'components/search/main',
  data_source: [
    {key: 'collection', required: true},
    {key: 'results', required: true},
    {key: 'search_attributes', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {
    _.bindAll(this, 'search');
    this.components = {};
    this._search_val = new App.Model({text: ''});

    this.components.input = {
      model: this._search_val,
      attribute: 'text',
      icon_button: 'search',
      icon_event_handler: this.search,
      label: 'Search Airports',
    };

    this.listenTo(this._search_val, 'change:text', this.search);

  },

  search: function(model) {
    console.log('search:', this._search_val.get('text'));
  },
});
