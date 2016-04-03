App.Model.extend({
  name: "Airport",
  urlRoot: "/airports",

  getTimeZone: function() {
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
