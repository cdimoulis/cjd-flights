App.View.extend({
  name: 'components/list/list_item',
  // tagName: 'li',
  attributes: {
    'class': 'list_item',
  },
  data_source: [
    {key: 'model', required: true},
    {key: 'view', required: true},
    {key: 'view_data', required: true},
  ],
  init_functions: [
    'setup',
  ],

  setup: function() {
    var data = this.data.view_data;
    data.model = this.data.model;
    this.display = {
      view: this.data.view,
      data: data,
    };

  },
})
