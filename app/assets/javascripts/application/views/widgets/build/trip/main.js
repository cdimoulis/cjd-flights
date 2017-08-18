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
    'setupListeners',
    'showURL',
  ],

  setup: function() {
    _.bindAll(this, 'openURL', 'showURL');
    this.components = {};
    this.url = new App.Model();
    this.selected_class = new App.Collection();
  },

  setupComponents: function() {
    var c = this.components;
    var service_class = new App.Collection([
      {id:1, text: 'Economy', value: 'ECONOMY'},
      {id:2, text: 'Premium Economy', value: 'COMFORT-PLUS-PREMIUM-ECONOMY'},
      {id:3, text: 'Business/First', value: 'BUSINESS-FIRST'},
    ]);

    this.selected_class.add(service_class.get(1));

    c.results = {
      text: "Results",
      icon: "arrow-back",
      event_handler: this.data.previous,
    };

    c.routes = {
      selected_routes: this.data.routes,
    };

    c.class_of_service = {
      collection: service_class,
      selected: this.selected_class,
      label_attr: 'text',
      title: 'Class of Service:',
    }

    c.open_url = {
      text: "View on Delta",
      event_handler: this.openURL,
    };

    c.url = {
      model: this.url,
      attribute: 'text',
    };
  },

  setupListeners: function() {
    this.listenTo(this.selected_class, 'reset', this.showURL);
  },

  openURL: function() {
    window.open(this.url.get('text'), '_blank');
  },

  showURL: function() {
    var count = 0;
    var url = "https://www.delta.com/air-shopping/priceTripAction.action?dispatchMethod=priceItin&\npaxCount=1&\ntripType=multiCity&\n";
    var selected_class = this.selected_class.first()
    url += "cabin="+ selected_class.get('value') +"&\n";

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
    url += "fareBasis=";

    this.url.set('text',url);
  },
});
