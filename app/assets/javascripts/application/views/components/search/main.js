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
    this.data.results.comparators = null;

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
    var _this = this;
    var search_text = this._search_val.get('text');
    var results = new App.Collection();

    if (search_text == '') {
      results.add(this.data.collection.models);
    }
    else {
      _.each(this.data.search_attributes, function(attr) {
        vals = _this.data.collection.pluck(attr);
        _.each(vals, function(val, index) {
          if (val.toLowerCase().search(search_text.toLowerCase()) >= 0) {
            results.add(_this.data.collection.at(index));
          }
        });
      });
    }

    this.data.results.reset(results.models);
  },
});
