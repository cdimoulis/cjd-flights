App.View.extend({
  name: 'widgets/build/results/select_leg',
  attributes: {
    'class': 'build_results_selection',
  },
  data_source: [
    {key: 'legs', required: true},
    {key: 'selected_leg', required: true},
  ],
  init_functions: [
    'setup',
    // 'setupListeners',
    'setupLegComponents',
  ],

  setup: function() {
    _.bindAll(this, '_selectLeg');
    this.components = {};
  },

  setupLegComponents: function() {
    var _this = this;

    this.components.legs = [];
    this.data.legs.each( function(leg) {
      var selected = leg.get('order') == _this.data.selected_leg.get('order');
      c = {
        text: leg.get('departure')+'-'+leg.get('arrival'),
        raised: false,
        button_color: selected ? 'primary' : 'accent',
        event_handler: function() {
          _this._selectLeg(leg);
        },
        attributes: new App.Model({'data-order': leg.get('order'), 'selected': selected}),
      }
      _this.components.legs.push(c);
    });
  },

  _selectLeg: function(leg) {
    var $o_sel = this.$el.find('paper-button[selected]');
    var $n_sel = this.$el.find('paper-button[data-order='+leg.get('order')+']');
    $o_sel.removeAttr('selected');
    $o_sel.removeClass('background-primary');
    $o_sel.addClass('background-accent');
    $n_sel.attr('selected', true);
    $n_sel.removeClass('background-accent');
    $n_sel.addClass('background-primary');

    this.data.selected_leg.set(leg.attributes);
  },
});
