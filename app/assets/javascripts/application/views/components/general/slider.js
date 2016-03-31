App.Component.extend({
  name: 'components/general/slider',
  tagName: 'paper-slider',
  dependencies: [
    'paper-slider/paper-slider.html',
  ],
  events: {
    'change': '_onChange',
    'value-change': '_onValueChange',
    'immediate-value-change': '_onImmediateChange',
  },
  data_source: [
    {key: 'model', required: true},
    {key: 'attribute', required: true},
    {key: 'attributes', required: false},
    {key: 'max', required: false, default: 100},
    {key: 'min', required: false, default: 0},
    {key: 'step', required: false, default: 1},
    {key: 'pin', required: false, default: false},
    {key: 'markers', required: false}, // Markers do not seem to work
    {key: 'snap', required: false, default: false},
    {key: 'immediate', rquired: false, default: false},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    _.bindAll(this, '_onChange');
    this.data.attributes = this.data.attributes || new App.Model();
    if (!this.data.attributes.has('class')) {
      this.data.attributes.set('class', '');
    }
    this.data.attributes.set('class', this.data.attributes.get('class')+' cjd-slider')

    this.el.id = this.data.attributes.get('id') || this.cid+'_slider';

    if (!this.data.attributes.has('id')) {
      this.data.attributes.set('id', this.el.id)
    }

    this.el.max = this.data.max;
    this.el.min = this.data.min;
    this.el.step = this.data.step;

    if (this.data.pin) {
      this.el.pin = true;
    }

    // Markers on on documentation, but don't seem to work yet
    if (!!this.data.markers && this.data.markers.length != 0) {
      this.el.markers = '['+this.data.markers.toString()+']';
      this.el.maxMarkers = this.data.markers.length;
      // Snap can only work if there are markers
      if (this.data.snap) {
        this.el.snap = true;
      }
    }

    // Setup listeners for model
    this.listenTo(this.data.model, 'change:'+this.data.attribute, function(model, value) {
      this.el.value = value;
    });

    // Setup listeners for attributes
    this.listenTo(this.data.attributes, 'change', this.setupAttributesModel);
  },

  setupAttributesModel: function() {
    var _this = this;

    _.each(this.data.attributes.attributes, function(val, key) {
      if (!val || key == 'class'){
        return;
      }
      _this.$el.attr(key, val);
    });

    this.$el.addClass(this.data.attributes.get('class') || '');
  },

  _onChange: function() {
    this.data.model.set(this.data.attribute, this.el.value);
  },

  _onImmediateChange: function() {
    if (this.data.immediate) {
      this.data.model.set(this.data.attribute, this.el.immediateValue);
    }
  }
});
