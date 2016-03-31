App.Component.extend({
  name: 'components/general/menu',
  tagName: 'paper-menu',
  dependencies: [
    "paper-menu/paper-menu.html",
  ],
  events: {
    'iron-activate': '_activate',
    'iron-deselect': '_deselect',
    'iron-items-changed': '_changed',
    'iron-select': '_select',
  },
  data_source: [
    {key: 'collection', required: true},
    {key: 'attribute', required: true},
    {key: 'selected', required: true},
    {key: 'view', required: false},
    {key: 'view_data', required: false},
    {key: 'attributes', required: false},
    {key: 'multi', required: false, default: false},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    _.bindAll(this, 'setupItems','setupSelected', '_addItem', '_activate',
              '_deselect', '_changed', '_select');
    var _this = this;
    this._selected_values = [];
    this.data.attributes = this.data.attributes || new App.Model();
    this._items = {};
    var attrs = {};
    var classes = '';

    this.display = {
      text: this.data.text,
      view: this.data.view,
      view_data: this.data.view_data,
    };

    attrs.id = this.data.attributes.get('id') || this.cid+"_menu";

    if (!this.data.attributes.has('id')) {
      this.data.attributes.set('id', attrs.id);
    }

    if (this.data.multi){
      attrs.multi = true;
    }

    this.$el.attr(attrs);
    this.$el.addClass(classes);

    // Listen to collection for changes
    this.listenTo(this.data.collection, 'sync', this.setupItems);
    this.listenTo(this.data.collection, 'add', this._addItem);
    this.listenTo(this.data.collection, 'remove', this._removeItem);
    this.listenTo(this.data.collection, 'reset', function() {
      _this._clearAll();
      _this.setupItems();
    });
    this.listenTo(this.data.collection, 'sort', function() {
      _this._clearAll();
      _this.setupItems();
    });
    this.listenTo(this, 'rendered', this.setupItems);

    // Listen to selected colleciton for changes
    this.listenTo(this.data.selected, 'sync reset add remove', function() {
      if (!!this.el.items) {
        this.setupSelected();
      }
    });

    // Listen to attribute changes
    this.listenTo(this.data.attributes, 'change', this.setupAttributesModel);
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

  setupItems: function() {
    var _this = this;

    this.data.collection.each(function(model) {
      _this._addItem(model);
    });
  },

  setupSelected: function() {
    if (this.data.multi) {
      var _this = this;
      var selected = [];
      this.data.selected.each(function(model) {
        var index = _this.data.collection.indexOf(model);
        if (index >= 0) {
          selected.push(index);
        }
      });
      // this.$el.prop('selectedValues', selected);
      this.el.selectedValues = selected;
    }
    else {
      var index;
      var first = this.data.selected.first();
      if (!!first) {
        index = this.data.collection.indexOf(first);
      }
      if (index >= 0) {
        // this.$el.prop('selected', index);
        this.el.selected = index;
      }
    }
  },

  _addItem: function(model) {
    if (_.has(this._items, model.cid)){
      return;
    }

    var data = {
      model: model,
      attribute: this.data.attribute,
      view: this.data.view,
      view_data: this.data.view_data,
    }

    var item = this.addView('components/general/item', data)

    this._items[model.cid] = item;
  },

  _removeItem: function(model) {
    var _this = this;
    var item = this._items[model.cid];
    item.$el.fadeOut(400, function() {
      _this.removeView(item);
      delete _this._items[model.cid];
    });
  },

  _clearAll: function() {
    var _this = this;
    _.each(this._items, function(item, key){
      item.$el.fadeOut(400, function() {
        _this.removeView(item);
      });
    });
    this._items = {};
    this.data.selected.reset();
  },

  _activate: function() {
  },

  _deselect: function(e) {
    if (this.data.multi) {
      var diff = _.difference(this._selected_values, this.el.selectedValues);
      console.log('deselect diff', diff[0]);
      this.data.selected.remove(this.data.collection.at(diff[0]));
      this._selected_values = _.clone(this.el.selectedValues);
    }
    else {
      this.data.selected.remove(this.data.selected.first());
    }
  },

  _changed: function() {
    this.setupSelected();
  },

  _select: function(e) {
    if (this.data.multi) {
      var diff = _.difference(this.el.selectedValues, this._selected_values);
      this.data.selected.add(this.data.collection.at(diff[0]));
      this._selected_values = _.clone(this.el.selectedValues);
    }
    else {
      this.data.selected.add(this.data.collection.at(this.el.selected));
    }
  },
});
