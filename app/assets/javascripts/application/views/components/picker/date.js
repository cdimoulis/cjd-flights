App.Component.extend({
  name: 'components/picker/date',
  tagName: 'paper-input',
  events: {
    // 'ready': 'setupDateConfig',
  //   'change': '_onChange',
  //   'keyup': '_validate',
  //   'click': '_onClick',
  },
  dependencies: [
    // "paper-date-picker/paper-date-picker.html",
  ],
  data_source: [
    {key: 'model', required: true},
    {key: 'attribute', required: true},
    {key: 'attributes', required: false},
    {key: 'required', required: false, default: false},
    {key: 'label', required: false, default: ''},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
    'setupDateConfig',
  ],

  setup: function() {
    _.bindAll(this, '_setDate');
    var data = this.data;
    var attrs = {};
    data.attributes = data.attributes || new App.Model();
    this.components = {};

    attrs.id = data.attributes.get('id') || this.cid+'_date_picker';

    if (!data.attributes.has('id')) {
      data.attributes.set('id', attrs.id);
    }

    attrs.date = data.model.get(data.attribute) || moment().format("YYYY-MM-DD");
    attrs.label = this.data.label;

    this.$el.attr(attrs);

    // Listen to changes to models
    this.listenTo(this.data.model, 'change:'+this.data.attribute, this._setDate);

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

  setupDateConfig: function() {
    var _this = this;
    console.log(this.$el.width());
    this.$el.Zebra_DatePicker({
      view: 'days',
      format: 'd M Y',
      direction: [true,false],
      // offset: [(this.$el.width()* -0.85), -5],
      onSelect: function() {
        _this._setDate.apply(_this, arguments)
      },
      // onClear: this._onClear
    });
  },

  _setDate: function(model, value) {
    this.$el.attr({date: value});
  },
});
