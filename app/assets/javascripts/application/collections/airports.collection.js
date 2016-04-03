App.Collection.extend({
  name: "Airports",
  model: App.Models.Airport,
  urlRoot: "/airports",

  comparator: function(a, b) {
    if (a.get('code') < b.get('code')) {
      return 1;
    }
    else {
      return -1;
    }
  },
});
