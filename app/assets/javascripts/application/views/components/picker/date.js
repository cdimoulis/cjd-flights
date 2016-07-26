App.Component.extend({
  name: 'components/picker/date',
  tagName: 'paper-input',
  attributes: {
    'class': 'datepicker',
  },
  dependencies: [
    "paper-input/paper-input.html",
    "iron-icon/iron-icon.html"
  ],
  data_source: [
    {key: 'model', required: true},
    {key: 'attribute', required: true},
    {key: 'attributes', required: false},
    {key: 'required', required: false, default: false},
    {key: 'label', required: false, default: ''},
    {key: 'future_date', required: false, default: false},
    {key: 'past_date', required: false, default: false},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
    'setupDateConfig',
  ],

  setup: function() {
    _.bindAll(this, '_setDate', '_selectDate');
    var data = this.data;
    var attrs = {};
    data.attributes = data.attributes || new App.Model();
    this.components = {};

    if (this.data.model.get(this.data.attribute)) {
      m = moment(this.data.model.get(this.data.attribute));
      attrs.value = m.format("DD MMM YYYY");
    }

    attrs.id = data.attributes.get('id') || this.cid+'_date_picker';

    if (!data.attributes.has('id')) {
      data.attributes.set('id', attrs.id);
    }

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
    var m, dir = 0, _this = this;
    if (this.data.model.get(this.data.attribute)) {
      m = moment(this.data.model.get(this.data.attribute)).format("DD MMM YYYY");
    }
    if (this.data.future_date && this.data.past_date) {
      dir = [moment(this.data.past_date).format('DD MMM YYYY'),moment(this.data.future_date).format('DD MMM YYYY')];
    }
    if (this.data.future_date && !this.data.past_date) {
      dir = [true, moment(this.data.future_date).format('DD MMM YYYY')];
    }
    if (!this.data.future_date && this.data.past_date) {
      // diff = moment(this.data.past_date).diff(moment(), 'days') - 1
      dir = [false, moment(this.data.past_date).format('DD MMM YYYY')];
    }

    this.$el.Zebra_DatePicker({
      view: 'days',
      format: 'd M Y',
      direction: dir,
      default_position: "below",
      show_icon: false,
      onSelect: this._selectDate,
      start_date: m || moment().format("DD MMM YYYY"),
      onClear: this._selectDate,
    });
  },

  _setDate: function(model, value) {
    if (value) {
      date = moment(value).format("DD MMM YYYY");
      this.$el.val(date);
    }
    else {
      this.$el.val("");
    }
  },

  _selectDate: function(d, date) {
    this.data.model.set(this.data.attribute, date);
  },
});
