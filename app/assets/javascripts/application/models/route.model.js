App.Model.extend({
  name: "Route",
  urlRoot: "/routes/search",

  isSame: function(route) {
    // if (this.cid == route.cid) {
    //   return true;
    // }

    if (!this.has('flights') || !route.has('flights')){
      return false;
    }

    var f1 = this.get('flights');
    var f2 = route.get('flights');

    if (f1.length == f2.length) {
      if (_.isArray(f1)) {
        f1 = new App.Collections.Flights(f1);
      }
      if (_.isArray(f2)) {
        f2 = new App.Collections.Flights(f2);
      }

      var match = true;
      f1.each( function(flight, index) {
        var other = f2.at(index);
        if (!flight.isSame(other)){
          match = false;
        }
      });
      return match;
    }
    else {
      return false;
    }
  },
});
