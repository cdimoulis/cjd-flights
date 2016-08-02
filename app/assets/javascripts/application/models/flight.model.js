App.Model.extend({
  name: "Flight",
  urlRoot: "/flights",

  isSame: function(flight) {
    var dep_date = moment(this.get('departure_date'));
    var arr_date = moment(this.get('arrival_date'));
    var f_dep_date = moment(flight.get('departure_date'));
    var f_arr_date = moment(flight.get('arrival_date'));

    var dates = (dep_date.isSame(f_dep_date) && arr_date.isSame(f_arr_date));
    var airports = this.get('departure_airport_id') == flight.get('departure_airport_id') && this.get('arrival_airport_id') == flight.get('arrival_airport_id')

    return (dates && airports && (this.get('number')==flight.get('number')) && (this.get('airline_id')==flight.get('airline_id')));
  },
});
