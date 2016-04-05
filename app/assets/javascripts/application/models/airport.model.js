App.Model.extend({
  name: "Airport",
  urlRoot: "/airports",

  setTimezone: function(zone, options) {
    hours = parseInt(zone.split(':')[0]);
    minutes = parseInt(zone.split(':')[1]);
    timezone = (hours * 60) + minutes;
    this.set({timezone: timezone}, options);
  },

  getTimezone: function() {
    var hours = parseInt(this.get('timezone') / 60);
    var minutes = Math.abs(this.get('timezone') % 60);
    var time = moment(hours+':'+minutes,'h:m').format('hh:mm')
    if (hours < 0) {
      time = '-'+time;
    }
    else {
      time = '+'+time;
    }
    return time;
  }
});
