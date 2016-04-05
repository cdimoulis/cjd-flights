Backbone.Collection = Backbone.Collection.extend({
  railsParams: true,

  url: function(){
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
