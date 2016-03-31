App.Component.extend({
  name: 'components/general/spinner',
  tagName: 'paper-spinner',
  dependencies: [
    'paper-spinner/paper-spinner.html',
  ],
  data_source: [
    {key: 'model', required: true},
    {key: 'attribute', required: true},
    {key: 'attributes', required: false},
    {key: 'alt', required: false},
  ],
  init_functions: [
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    this.data.attributes = this.data.attributes || new App.Model();

    this.el.id = this.data.attributes.get('id') || this.cid+'_spinner';

    if (!this.data.attributes.has('id')) {
      this.data.attributes.set('id', this.el.id)
    }

    this.el.active = this.data.model.get(this.data.attribute);

    // Listen to active change
    this.listenTo(this.data.model, 'change:'+this.data.attribute, function(model, value) {
      this.el.active = value;
    })

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
});
