App.View.extend({
  name: 'widgets/build/trip/main',
  attributes: {
    'class': 'build_trip',
  },
  data_source: [
    {key: 'routes', required: true},
    {key: 'previous', required: true},
  ],
  init_functions: [
    'setup',
    'setupComponents',
    'showURL',
  ],

  setup: function() {
    _.bindAll(this, 'openURL');
    this.components = {};
    this.url = new App.Model();
    window.uu = this.url;
  },

  setupComponents: function() {
    var c = this.components;

    c.results = {
      text: "Results",
      icon: "arrow-back",
      event_handler: this.data.previous,
    };

    c.routes = {
      selected_routes: this.data.routes,
    };

    c.show_url = {
      text: "URL",
      event_handler: this.showURL,
    };

    c.open_url = {
      text: "OPEN",
      event_handler: this.openURL,
    };

    c.url = {
      model: this.url,
      attribute: 'text',
    };
  },

  openURL: function() {
    window.open(this.url.get('text'), '_blank');
  },

  showURL: function() {
    var count = 0;
    var url = "https://www.delta.com/air-shopping/priceTripAction.action?dispatchMethod=priceItin&\npaxCount=1&\ntripType=multiCity&\ncabin=B5-Coach&\n";

    this.data.routes.each( function(route) {
      _.each(route.get('flights'), function(flight) {
        var date = moment(flight.get('departure_date'));
        var airline = flight.get('airline');
        var arrival = flight.get('arrival_airport');
        var departure = flight.get('departure_airport');

        url += 'itinSegment['+count+']='+route.get('order')+':V:';
        url += departure.iata+':'+arrival.iata+':'+airline.code+':'+flight.get('number')+':';
        url += date.format('MMM').substr(0,3)+':'+date.format('DD')+':';
        url += +date.format('YYYY')+':'+date.format('hhA').substr(0,3)+"&\n";
        count++;
      });
    });
    url += 'numOfSegments='+count+"&\n";
    url += "price=0&\ncurrencyCd=USD&\nfareBasis=&\nexitCountry=US";

    console.log(url);
    this.url.set('text',url);
  },
});
