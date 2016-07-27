Backbone.Collection = Backbone.Collection.extend({
  railsParams: true,
  _hasFetched: false,

  initialize: function() {
    var _this = this;
    this.listenTo(this, 'sync', function() {
      _this._hasFetched = true;
    });

    // Set sync true as an option
    // This allows us to know if adds are result of a sync
    this.__fetch = this.fetch;
    this.fetch = function(options) {
      options.sync = true
      this.__fetch(options);
    }
  },

  hasFetched: function() {
    return this._hasFetched;
  },

  url: function() {
    var url = '';

    if (!!this.parent){
      url += this.parent.url();
    }

    if (!!this.urlRoot){
      url += this.urlRoot;
    }

    return url;
  },

  toJSON: function() {
    var name = this['name'].toUnderscore().toLowerCase();
    var obj = {};
    var models = this.map( function(model) {
      var rp = model.railsParams;
      model.railsParams = false;
      m = model.toJSON();
      model.railsParams = rp;
      return m;
    });

    obj[name] = models;
    return obj;
  },

});
