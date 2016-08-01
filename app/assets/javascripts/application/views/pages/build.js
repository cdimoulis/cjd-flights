App.Page.extend({
  name: "pages/build",
  attributes: {
    'class': 'page_build',
  },
  init_functions: [
    'setup',
  ],

  setup: function() {
    _.bindAll(this, 'buildLegsView', 'resultsView', 'tripView');
    this.components = c = {};
    this.current_view = null;
    this.legs = new App.Collection()
    this.display = {
      title: "Enter Route Information",
    }

    this.legs.comparator = function(a,b) {
      if (a.get('order') < b.get('order')) {
        return -1;
      }
      else {
        return 1;
      }
    }

    c.build_legs = {
      legs: this.legs,
      next: this.resultsView,
    };

    c.route_results = {
      legs: this.legs,
      next: this.tripView,
      previous: this.buildLegsView
    };

    this.listenTo(this, 'rendered', this.buildLegsView);
  },

  buildLegsView: function() {
    if (this.current_view) {
      this.removeView(this.current_view);
    }
    this.current_view = this.addView('widgets/build/routes/main', this.components.build_legs, this.$el.find('.current-view') )
  },

  resultsView: function() {
    if (this.current_view) {
      this.removeView(this.current_view);
    }
    this.current_view = this.addView('widgets/build/results/main', this.components.route_results, this.$el.find('.current-view') )
  },

  tripView: function() {

  },
});
