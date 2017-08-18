App.Component.extend({
  name: 'components/toggles/button',
  tagName: 'paper-button',
  events:{
    'click': '_onClick',
  },
  dependencies: [
    "paper-button/paper-button.html",
  ],
  data_source:[
    {key: 'text', required: true},
    {key: 'status', required: false}, // Model for toggling true/false stats, setting initial status
    {key: 'status_attr', required: false}, // Attributes for model to read/set status
    {key: 'raised', required: false, default: true, options: [true,false]},
    {key: 'ripple', required: false, default: true, options: [true,false]},
    {key: 'on_color', required: false, default: 'primary', options: ['primary', 'accent']},
    {key: 'off_color', required: false, default: 'accent', options: ['primary', 'accent']},
    {key: 'text_color', required: false, default: 'black', options: ['black', 'white']},
    {key: 'icon', required: false},
    {key: 'event_handler', required: false}, // When status changes this will fire passing status
    {key: 'attributes', required: false},
  ],
  init_functions:[
    'setup',
    'setupAttributesModel',
  ],

  setup: function() {
    _.bindAll(this, '_handleDisabled', '_getBackgroundClass', '_onClick');
    this.data.attributes = this.data.attributes || new App.Model()
    this.data.status_attr = this.data.status_attr || 'on';
    obj = {}
    obj[this.data.status_attr] = false
    this.data.status = this.data.status || new App.Model(obj);
    var attrs = {};
    var classes = '';

    this.display = {
      text: this.data.text,
      icon: this.data.icon,
    }

    attrs.id = this.data.attributes.get('id') || this.cid+'_button';

    if (!this.data.attributes.has('id')) {
      this.data.attributes.set('id', attrs.id);
    }

    // Determine some raised and ripple
    if (this.data.raised) {
      attrs['raised'] = true;
    }

    if (!this.data.ripple) {
      attrs['noink'] = true;
    }

    // Determine class for background color
    if (!this.data.attributes.get('disabled')) {
      if (this.data.status.get(this.data.status_attr)) {
        classes += this._getBackgroundClass(this.data.on_color);
      }
      else {
        classes += this._getBackgroundClass(this.data.off_color);
      }
      
      // Determine class for text color
      if (this.data.text_color == 'white') {
        classes += 'text-white ';
      }
    }

    this.$el.attr(attrs);
    this.$el.addClass(classes);

    this.listenTo(this.data.status, 'change:'+this.data.status_attr, function(model,val,opts) {
      this._setStatus(val);
    });
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
    var $button = this.$el.find('paper-button');
    if (disabled) {
      $button.attr('disabled',true);
      $button.removeClass('background-primary');
      $button.removeClass('background-accent');
      $button.removeClass('text-white');
    }
    else {
      $button.removeAttr('disabled');
      if (this.data.status.get(this.data.status_attr)) {
        classes += this._getBackgroundClass(this.data.on_color);
      }
      else {
        classes += this._getBackgroundClass(this.data.off_colo);
      }
      if (this.data.text_color == 'white') {
        $button.addClass('text-white');
      }
    }
  },

  _getBackgroundClass: function(color) {
    switch(color) {
      case 'primary': {
        return 'background-primary';
        break;
      }
      case 'accent': {
        return 'background-accent';
        break;
      }
    }
  },

  _onClick: function(e) {
    var status = this.data.status.get(this.data.status_attr);
    this.data.status.set(this.data.status_attr, !status);

    // Send status to event handler
    if (_.has(this.data, 'event_handler') && _.isFunction(this.data.event_handler)) {
      this.data.event_handler(!status);
    }
    this._setStatus(!status);
  },

  _setStatus: function(status) {
    // Change button background
    if (status) {
      this.$el.removeClass(this._getBackgroundClass(this.data.off_color));
      this.$el.addClass(this._getBackgroundClass(this.data.on_color));
    }
    else {
      this.$el.removeClass(this._getBackgroundClass(this.data.on_color));
      this.$el.addClass(this._getBackgroundClass(this.data.off_color));
    }

  },
});
