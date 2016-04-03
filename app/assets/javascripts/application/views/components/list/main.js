App.View.extend({
  name: 'components/list/main',
  attributes: {
    'class': 'list',
  },
  data_source: [
    {key: 'collection', required: true},
    {key: 'view', required: true},
    {key: 'view_data', required: false, default: {}},
    {key: 'attributes', required: false},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    _.bindAll(this, 'buildList', 'addItem', 'removeItem', 'clearAll');
    var _this = this;
    this.data.attributes = this.data.attributes || new App.Model();
    this._views = {};

    // Fetch the airports and listen for sync
    // this.listenTo(this.data.collection, 'sync', this.buildList);
    this.listenTo(this.data.collection, 'add', this.addItem);
    this.listenTo(this.data.collection, 'remove', this.removeItem);
    this.listenTo(this.data.collection, 'reset', function() {
      this.clearAll(this.buildList);
    });
    this.listenTo(this.data.collection, 'sort', function() {
      this.clearAll(this.buildList);
    });
    this.listenTo(this, 'rendered', this.buildList);
  },

  setupAttributesModel: function() {
    var _this = this;

    _.each(this.data.attributes.attributes, function(val, key) {
      if (key == 'class') {
        return;
      }
      if (_.isBoolean(val) && !val) {
        _this.$el.removeAttr(key);
      }
      else {
        _this.$el.attr(key, val);
      }
    });

    this.$el.addClass(this.data.attributes.get('class') || '');
  },

  buildList: function() {
    var _this = this;
    this.data.collection.each( function(model) {
      _this.addItem(model);
    });
  },

  addItem: function(model) {
    if (_.has(this._views, model.cid)){
      return;
    }

    var data = {
      model: model,
      view: this.data.view,
      view_data: this.data.view_data,
    };

    var view = this.addView('components/list/list_item', data, '.list');
    this._views[model.cid] = view;
  },

  removeItem: function(model) {
    var _this = this;
    var view = this._views[model.cid];
    _this.removeView(view);
    delete _this._views[model.cid];
  },

  clearAll: function(complete) {
    var _this = this;
    count = _.size(this._views);
    views = _.clone(this._views);

    _.each(views, function(view, key) {
      _this.removeView(view);
      delete _this._views[key];
      count--;
      if (count == 0) {
        if (_.isFunction(complete)) {
          complete.apply(_this);
        }
      }
    });
  },
});