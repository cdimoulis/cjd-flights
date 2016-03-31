App.Component.extend({
  name: 'components/general/selection',
  tagName: 'paper-dropdown-menu',
  attributes: {
    'no-animations': true,
  },
  dependencies: [
    'paper-dropdown-menu/paper-dropdown-menu.html',
  ],
  data_source: [
    {key: 'collection', required: true},
    {key: 'attribute', required: true},
    {key: 'selected', required: true},
    {key: 'attributes', required: false},
    {key: 'label', required: false, default: ''},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    this.data.attributes = this.data.attributes || new App.Model();
    var attrs = {};

    // Setup menu component
    this._selected_collection = new App.Collection(this.data.selected.models);
    this.components = {
      menu: {
        collection: this.data.collection,
        attribute: this.data.attribute,
        selected: this._selected_collection,
        attributes: new App.Model({class: 'dropdown-content'})
      }
    };

    // Setup attributes
    attrs.id = this.data.attributes.get('id') || this.cid+'_dropdown_menu';
    if (!this.data.attributes.has('id')) {
      this.data.attributes.set('id', attrs.id);
    }
    attrs.label = this.data.label;

    this.$el.attr(attrs);

    // Listen to selection
    this.listenTo(this._selected_collection, 'add', function(model, colleciton, options) {
      if (!options[this.el.id+'_silent']) {
        options = {};
        options[this.el.id+'_silent'] = true
        this.data.selected.add(model, options);
      }
    });

    this.listenTo(this._selected_collection, 'remove', function(model, colleciton, options) {
      if (!options[this.el.id+'_silent']) {
        options = {};
        options[this.el.id+'_silent'] = true
        this.data.selected.remove(model, options)
      }
    });

    this.listenTo(this._selected_collection, 'reset', function(colleciton, options) {
      if (!options[this.el.id+'_silent']) {
        options = {};
        options[this.el.id+'_silent'] = true
        this.data.selected.reset([], options);
      }
    });

    // Listen to this element' selection
    this.listenTo(this.data.selected, 'add', function(model, collection, options) {
      if (!options[this.el.id+'_silent']) {
        options = {};
        options[this.el.id+'_silent'] = true
        this._selected_collection.reset([model], options);
      }
    });
    this.listenTo(this.data.selected, 'remove', function(model, colleciton, options) {
      if (!options[this.el.id+'_silent']) {
        options = {};
        options[this.el.id+'_silent'] = true
        this._selected_collection.remove(model, options);
      }
    });
    this.listenTo(this.data.selected, 'reset', function(colleciton, options) {
      if (!options[this.el.id+'_silent']) {
        options = {};
        options[this.el.id+'_silent'] = true
        this._selected_collection.reset(this.data.selected.models, options);
      }
    });
    this.listenTo(this.data.selected, 'sync', function(collection, response, options) {
      if (!options[this.el.id+'_silent']) {
        options = {};
        options[this.el.id+'_silent'] = true
        this._selected_collection.reset(this.data.selected.models, options);
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
});
