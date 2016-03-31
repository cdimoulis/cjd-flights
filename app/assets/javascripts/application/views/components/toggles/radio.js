App.Component.extend({
  name: 'components/toggles/radio',
  tagName: 'paper-radio-button',
  events: {
    'change': '_onChange',
  },
  dependencies: [
    "paper-radio-button/paper-radio-button.html",
  ],
  data_source: [
    {key: 'model', required: true},
    {key: 'attribute', required: true},
    {key: 'value', required: true},
    {key: 'attributes', required: false},
    {key: 'label', required: false, default: ''},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    _.bindAll(this, 'handleModelChange', '_onChange');
    this.data.attributes = this.data.attributes || new App.Model();
    var attrs = {};
    var classes = '';

    this.display = {
      label: this.data.label,
    };

    attrs.id = this.data.attributes.get('id') || this.cid+'_radio_button';

    if (!this.data.attributes.has('id')) {
      this.data.attributes.set('id', attrs.id);
    }

    if (this.data.model.get(this.data.attribute) == this.data.value) {
      attrs.checked = true;
    }

    this.$el.attr(attrs);
    this.$el.addClass(classes);

    // Listen for model and attr change
    this.listenTo(this.data.model, 'change:'+this.data.attribute, this.handleModelChange);
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

  handleModelChange: function (model, value, options) {
    if (!options[this.cid+'_silent']) {
      if (this.data.model.get(this.data.attribute) == this.data.value) {
        this.el.checked = true
      }
      else {
        this.el.checked = false
      }
    }
  },

  _onChange: function() {
    if (this.el.checked) {
      obj = {};
      obj[this.data.attribute] = this.data.value;
    }
    else {
      obj = {};
      obj[this.data.attribute] = null;
    }
    options = {};
    options[this.cid+"_silent"] = true;
    this.data.model.set(obj, options);
  },
});
