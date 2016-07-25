App.Component.extend({
  name: 'components/picker/date',
  tagName: 'paper-date-picker',
  // events: {
  //   'change': '_onChange',
  //   'keyup': '_validate',
  //   'click paper-icon-button': '_onClick',
  // },
  dependencies: [
    "paper-date-picker/paper-date-picker.html",
    // "paper-date-picker/paper-calendar.html",
    // "paper-date-picker/paper-year-list.html",
    // "paper-button/paper-button.html",
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

  _setDate: function(model, value) {
    this.$el.attr({date: value});
  },
});
