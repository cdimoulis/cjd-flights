App.Component.extend({
  name: 'components/button/icon',
  tagName: 'paper-icon-button',
  events:{
    'click': '_onClick',
  },
  dependencies: [
    "paper-icon-button/paper-icon-button.html",
  ],
  data_source:[
    {key: 'icon', required: true},
    {key: 'ripple', required: false, default: true, options: [true,false]},
    {key: 'button_color', required: false, default: false, options: ['primary','accent']},
    {key: 'icon_color', required: false, default: 'black', options: ['black', 'white']},
    {key: 'event_handler', required: false},
    {key: 'attributes', required: false},
  ],
  init_functions:[
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    _.bindAll(this, '_handleDisabled', '_onClick');
    this.data.attributes = this.data.attributes || new App.Model()
    var classes = "";
    var attrs = {};

    // Determine class for background color if not disabled
    if (!this.data.attributes.get('disabled')){
      switch(this.data.button_color) {
        case 'primary': {
          classes += "mdl-color--primary ";
          break;
        }
        case 'accent': {
          classes += "mdl-color--accent ";
          break;
        }
      }

      // Determine class for text color
      if (this.data.icon_color == 'white') {
        classes += "text-white";
      }
    }

    // Determine attributes
    var id = this.data.attributes.get('id') || this.cid+'_icon_button';
    attrs.id = id;
    attrs.icon = this.data.icon;

    if (!this.data.attributes.has('id')) {
      this.data.attributes.set('id',attrs.id);
    }

    this.$el.attr(attrs);
    this.$el.addClass(classes);
    this.listenTo(this.data.attributes, 'change:disabled', this._handleDisabled);
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

  _handleDisabled: function(model,disabled) {
    if (disabled) {
      this.$el.attr('disabled',true);
      this.$el.removeClass('mdl-color--primary');
      this.$el.removeClass('mdl-color--accent');
      this.$el.removeClass('text-white');
    }
    else {
      this.$el.removeAttr('disabled');
      switch(this.data.button_color) {
        case 'primary': {
          this.$el.addClass('mdl-color--primary');
          break;
        }
        case 'accent': {
          this.$el.addClass('mdl-color--accent');
          break;
        }
      }
      if (this.data.icon_color == 'white') {
        this.$el.addClass('text-white');
      }
    }
  },

  _onClick: function(e) {
    if (_.has(this.data, 'event_handler') && _.isFunction(this.data.event_handler)) {
      this.data.event_handler(e);
    }
  },
});
