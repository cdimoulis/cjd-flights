App.Component.extend({
  name: 'components/button/main',
  tagName: 'paper-button',
  events:{
    'click': '_onClick',
  },
  dependencies: [
    "paper-button/paper-button.html",
  ],
  data_source:[
    {key: 'text', required: true},
    {key: 'raised', required: false, default: true, options: [true,false]},
    {key: 'ripple', required: false, default: true, options: [true,false]},
    {key: 'button_color', required: false, default: false, options: ['primary','accent']},
    {key: 'text_color', required: false, default: 'black', options: ['black', 'white']},
    {key: 'icon', required: false},
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
      switch(this.data.button_color) {
        case 'primary': {
          classes += 'mdl-color--primary ';
          break;
        }
        case 'accent': {
          classes += 'mdl-color--accent ';
          break;
        }
      }

      // Determine class for text color
      if (this.data.text_color == 'white') {
        classes += 'text-white ';
      }
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
    var $button = this.$el.find('paper-button');
    if (disabled) {
      $button.attr('disabled',true);
      $button.removeClass('mdl-color--primary');
      $button.removeClass('mdl-color--accent');
      $button.removeClass('text-white');
    }
    else {
      $button.removeAttr('disabled');
      switch(this.data.button_color) {
        case 'primary': {
          $button.addClass('mdl-color--primary');
          break;
        }
        case 'accent': {
          $button.addClass('mdl-color--accent');
          break;
        }
      }
      if (this.data.text_color == 'white') {
        $button.addClass('text-white');
      }
    }
  },

  _onClick: function(e) {
    if (_.has(this.data, 'event_handler') && _.isFunction(this.data.event_handler)) {
      this.data.event_handler(e);
    }
  },
});
