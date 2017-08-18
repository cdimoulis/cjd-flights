App.View.extend({
  name: 'components/toggles/button_group',
  attributes: {
    'class': 'toggle_button_group',
  },
  data_source: [
    {key: 'collection', required: true},
    {key: 'selected', required: true},
    {key: 'label_attr', required: true},
    {key: 'title', required: false, default: false},
    {key: 'single_selection', required: false, default: true},
  ],
  init_functions: [
    'setup',
    'setupListeners',
    'setupComponents',
  ],

  setup: function() {
    _.bindAll(this, '_singleSelect');
    this.components = {};
    this.multi_select_status = {};
  },

  setupListeners: function() {
    var _this = this;
    this.listenTo(this.data.collection, 'reset', function() {
      _this.setupComponents();
      _this.render();
    })

    this.listenTo(this.data.selected, 'add', function(model) {
      if (_this.data.single_selection) {
        _this._singleSelect(model);
      }
      else {
        var status = this.multi_select_status[model.cid];
        if (status) {
          status.set('selected', true);
        }
      }
    });

    this.listenTo(this.data.selected, 'remove', function(model) {
      if (!_this.data.single_selection) {
        var status = this.multi_select_status[model.cid];
        if (status) {
          status.set('selected', false);
        }
      }
    });

    this.listenTo(this.data.selected, 'reset', function() {
      _this.setupComponents();
      _this.render();
    })

  },

  setupComponents: function() {
    var _this = this;
    this.components.buttons = [];

    // Use regular buttons for
    if (this.data.single_selection) {
      this.data.collection.each( function(model, index) {
        var selected = _this.data.selected.contains(model);
        c = {
          text: model.get(_this.data.label_attr),
          raised: false,
          button_color: selected ? 'primary' : 'accent',
          event_handler: function() {
            _this._singleSelect(model);
          },
          attributes: new App.Model({'data-order': model.cid, 'selected': selected}),
        };
        _this.components.buttons.push(c);
      });
    }

    else {
      this.data.collection.each( function(model) {
        var selected = _this.data.selected.contains(model);
        _this.multi_select_status[model.cid] = new App.Model({selected: selected});
        c = {
          text: model.get(_this.data.label_attr),
          status: _this.multi_select_status[model.cid],
          status_attr: 'selected',
          raised: false,
          event_handler: function(selected) {
            _this._multiSelect(model,selected);
          },
          attributes: new App.Model({'data-order': model.cid, 'selected': selected}),
        };
        _this.components.buttons.push(c);
      });
    }
  },

  _singleSelect: function(model) {
    var $o_sel = this.$el.find('paper-button[selected]');
    var $n_sel = this.$el.find('paper-button[data-order='+model.cid+']');
    $o_sel.removeAttr('selected');
    $o_sel.removeClass('background-primary');
    $o_sel.addClass('background-accent');
    $n_sel.attr('selected', true);
    $n_sel.removeClass('background-accent');
    $n_sel.addClass('background-primary');

    this.data.selected.reset(model);
  },

  _multiSelect: function(model,selected) {
    if (selected) {
      this.data.selected.add(model);
    }
    else {
      this.data.selected.remove(model);
    }
  },
});
