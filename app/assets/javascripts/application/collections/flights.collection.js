App.Collection.extend({
  name: "Flights",
  model: App.Models.Flight,
  urlRoot: "/flights",

  comparator: function(a,b) {
    var dep_a = moment(a.get('departure_date'));
    var dep_b = moment(b.get('departure_date'));
    if (dep_a.isBefore(dep_b)) {
      return -1;
    }
    else {
      return 1;
    }
  },

  removeDuplicates: function() {
    var _this = this;
    var temp = new App.Collection(this.models);

    temp.each( function(model) {
      var obj = {
        aircraft: model.get('aircraft'),
        airline_id: model.get('airline_id'),
        arrival_airport_id: model.get('arrival_airport_id'),
        arrival_date: model.get('arrival_date'),
        departure_airport_id: model.get('departure_airport_id'),
        departure_date: model.get('departure_date'),
        number: model.get('number'),
      };

      var models = _this.where(obj);
      if (models.length > 1) {
        models.shift();
        _this.remove(models);
      }
    });
  },
});
