App.Component.extend({
  name: 'components/text/area',
  tagName: 'paper-textarea',
  events: {
    'change': '_onChange',
  },
  dependencies: [
    "paper-input/paper-textarea.html",
  ],
  _standard_patterns: {
    alpha: '[A-Z,a-z]*',
    capital_alpha: '[A-Z]*',
    lower_alpha: '[a-z]*',
    alpha_numeric: '[A-Z,a-z,0-9]*',
    numeric: '-?[0-9]*(\\.[0-9]+)?',
    numeric_positive: '[0-9]*(\\.[0-9]+)?',
    numeric_whole: '-?[0-9]*',
    numeric_whole_positive: '[0-9]*',
    phone_number: '((\\()?[2-9]{1}\\d{2}(\\))?-)?[2-9]{1}\\d{2}-\\d{4}',
    ssn: '[1-9]{3}-[1-9]{2}-[1-9]{4}'
  },
  data_source: [
    {key: 'model', required: true},
    {key: 'attribute', required: true},
    {key: 'attributes', required: false},
    {key: 'label', required: false, default: ''},
    {key: 'float_label', required: false, default: true},
    {key: 'always_float_label', require: false, default: false},
    {key: 'pattern', required: false},
    {key: 'error_message', required: false, default: "Invalid Input"},
    {key: 'auto_validate', required: false, default: false},
    {key: 'char_counter', required: false, default: false},
    {key: 'max_count', required: false},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    _.bindAll(this, '_setValue', '_onChange');
    var data = this.data;
    var attrs = {};
    data.attributes = data.attributes || new App.Model()

    attrs.id = this.data.attributes.get('id') || this.cid+'_textarea';

    if (!data.attributes.has('id')) {
      data.attributes.set('id', attrs.id);
    }

    // Setup the attributes of the paper input element
    attrs.value = data.model.get(data.attribute) || '';
    attrs.label = data.label;
    attrs['error-message'] = data.error_message;

    if (!!data.max_count){
      attrs.maxlength = data.max_count;
    }

    if (!!data.pattern){
      if (!!data.pattern && !!this._standard_patterns[data.pattern]) {
        attrs.pattern = this._standard_patterns[data.pattern];
      }
      else {
        attrs.pattern = data.pattern || '';
      }
    }

    if (!data.float_label) {
      attrs['no-label-float'] = true;
    }

    if (data.float_label && data.always_float_label) {
      attrs['always-float-label'] = true;
    }

    if (data.auto_validate) {
      attrs['auto-validate'] = true;
    }

    if (data.char_counter) {
      attrs['char-counter'] = true;
    }

    if (data.password) {
      attrs.type = "password";
    }

    this.$el.attr(attrs);

    // Listen to changes to models
    this.listenTo(this.data.model, 'change:'+this.data.attribute, this._setValue);

    // Listen to attributes changes
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

  _setValue: function(model,value) {
    var $input = this.$el.find('paper-textarea');
    $input.val(value);
  },

  _onChange: function(e) {
    if (this.el.validate()) {
      this.data.model.set(this.data.attribute, this.el.value);
    }
  },
});
