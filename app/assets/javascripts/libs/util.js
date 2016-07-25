App.Util = {
  latLonDistance: function(lat1, lat2, lon1, lon2) {
    // var lat1 = 33.6366667;
    // var lat2 = 41.9786111;
    // var lon1 = -84.428056;
    // var lon2 = -87.904722;
    var R = 6371e3; // metres
    var a1 = App.Util.toRadians(lat1);
    var a2 = App.Util.toRadians(lat2);
    var da = App.Util.toRadians(lat2-lat1);
    var dλ = App.Util.toRadians(lon2-lon1);

    var a = Math.sin(da/2) * Math.sin(da/2) +
            Math.cos(a1) * Math.cos(a2) *
            Math.sin(dλ/2) * Math.sin(dλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  },

  toRadians: function(d) {
    r = d * (Math.PI/180);
    return r;
  }
}
