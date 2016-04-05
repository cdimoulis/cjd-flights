Backbone.Model = Backbone.Model.extend({
  railsParams: true,

  url: function(){
    var url = '';

    if (!!this.parent){
      url += this.parent.url();
    }

    if (!!this.urlRoot){
      url += this.urlRoot;
    }
    else{
      url += '/'+this.name.toUnderscore();
    }

    if (this.has('id') && !!this.get('id')){
      url += '/'+this.get('id');
    }

    return url;
  },

  toJSON: function() {
    if (this.railsParams) {
      var name = this['name'].toUnderscore().toLowerCase();
      var obj = {};

      if (!_.isUndefined(name)) {
        obj[this['name'].toUnderscore()] = _.clone(this.attributes);
      }
      else {
        obj = _.clone(this.attributes);
      }
    }
    else {
      obj = _.clone(this.attributes);
    }
    return obj;
  },

});
