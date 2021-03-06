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
    this.selected_routes = new App.Collections.Routes();
    this.display = {
      title: "Enter Route Information",
    }

    var order_comparator = function(a,b) {
      if (a.get('order') < b.get('order')) {
        return -1;
      }
      else {
        return 1;
      }
    }

    this.legs.comparator = order_comparator;
    this.selected_routes.comparator = order_comparator;

    c.build_legs = {
      legs: this.legs,
      next: this.resultsView,
    };

    c.route_results = {
      legs: this.legs,
      selected_routes: this.selected_routes,
      next: this.tripView,
      previous: this.buildLegsView
    };

    c.trip = {
      routes: this.selected_routes,
      previous: this.resultsView,
    }

    this.listenTo(this, 'rendered', this.buildLegsView);
  },

  buildLegsView: function() {
    if (this.current_view) {
      this.removeView(this.current_view);
    }
    this.legs.each( function(leg) {
      leg.unset('routes');
    });
    this.selected_routes.reset();
    this.current_view = this.addView('widgets/build/routes/main', this.components.build_legs, this.$el.find('.current-view') );
  },

  resultsView: function() {
    if (this.current_view) {
      this.removeView(this.current_view);
    }
    this.current_view = this.addView('widgets/build/results/main', this.components.route_results, this.$el.find('.current-view') );
  },

  tripView: function() {
    if (this.current_view) {
      this.removeView(this.current_view);
    }
    this.current_view = this.addView('widgets/build/trip/main', this.components.trip, this.$el.find('.current-view') );
  },
});
