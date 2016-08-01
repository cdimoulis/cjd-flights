App.Page.extend({
  name: "pages/build",
  attributes: {
    'class': 'page_build',
  },
  init_functions: [
    'setup',
  ],

  setup: function() {
    _.bindAll(this, 'buildLegsView', 'resultsView');
    this.components = c = {};
    this.current_view = null;
    this.legs = new App.Collection()
    this.display = {
      title: "Enter Route Information",
    }

    c.build_legs = {
      legs: this.legs,
      next: this.resultsView,
    };

    c.route_results = {
      legs: this.legs,
    };

    this.listenTo(this, 'rendered', this.buildLegsView);
  },

  buildLegsView: function() {
    if (this.current_view) {
      this.removeView(this.current_view);
    }
    this.current_view = this.addView('widgets/build/legs', this.components.build_legs, this.$el.find('.current-view') )
  },

  resultsView: function() {
    if (this.current_view) {
      this.removeView(this.current_view);
    }
    this.current_view = this.addView('widgets/build/results', this.components.route_results, this.$el.find('.current-view') )
  },
});
