App.Collection.extend({
  name: "Airports",
  model: App.Models.Airport,
  urlRoot: "/airports",

  comparator: function(a, b) {
    if (a.get('iata') < b.get('iata')) {
      return -1;
    }
    else {
      return 1;
    }
  },
});
