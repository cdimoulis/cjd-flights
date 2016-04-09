App.View.extend({
  name: 'components/search/main',
  attributes: {
    'class': 'search',
  },
  data_source: [
    {key: 'collection', required: true},
    {key: 'results', required: true},
    {key: 'search_attributes', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {
    var _this = this;
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
    // Listen to changes in the search value and then performe the search/filter
    this.listenTo(this._search_val, 'change:text', this.search);

    // Listen to the full collection as to alter filter needs
    this.listenTo(this.data.collection, 'sync reset', this.search);
    this.listenTo(this.data.collection, 'remove', function(model) {
      _this.data.results.remove(model);
    });
    this.listenTo(this.data.collection, 'add', function(model, collection, options) {
      if (!options.sync) {
        this.addModel(model);
      }
    });
  },

  search: function() {
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
          if (!!val && val.toLowerCase().search(search_text.toLowerCase()) >= 0) {
            results.add(_this.data.collection.at(index));
          }
        });
      });
    }
    
    this.data.results.reset(results.models);
  },

  addModel: function(model) {
    var _this = this;
    var search_text = this._search_val.get('text');

    if (search_text == '') {
      this.data.results.add(model);
    }
    else {
      keys = _.keys(model.attributes);
      _.each(keys, function(key) {
        if (_.contains(_this.data.search_attributes, key)) {
          val = model.get(key);
          if (!!val && val.toLowerCase().search(search_text.toLowerCase()) >= 0) {
            _this.data.results.add(model);
          }
        }
      });
    }
  },
});
