Backbone.Model = Backbone.Model.extend({

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
  }
});
