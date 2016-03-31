Backbone.View = Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this, '_processDependencies', '_processData', '_processInitFunctions',
              '_processAttributes', '_addChildView', 'render', 'appendTo');

    var _this = this;
    options = options || {}

    this.template = App.Templates[this.name];
    this.data = {};
    this.children = {};
    this.parent = options.parent;

    this._processDependencies();
    this._processData(options.hash || {});
    this._processInitFunctions();
    this._processAttributes();
  },

  _processDependencies: function() {
    _.each(this.dependencies, function(dependency) {
      App.importDependency(dependency);
    });
  },

  _processData: function(hash) {
    var _this = this,
    data = hash.data || {};

    _.each(this.data_source, function(source) {
      var val;
      // If required check exists
      if (source.required){
        if (_.isUndefined(data[source.key]) || _.isNull(data[source.key])){
          throw 'View '+_this.name+' requires data source '+source.key;
          return;
        }
      }

      val = data[source.key];

      // If options check included
      if (!_.isUndefined(source.options) && !_.isNull(source.options) &&
          !_.isEmpty(source.options) && !_.isUndefined(val) && !_.isNull(val)){

        if (!_.contains(source.options,val)){
          console.warn('In view '+_this.name+' data source '+source.key+
                      ' is restricted to options ['+source.options+']. '+
                      'Instead found: '+val+'.');
          val = null;
        }
      }

      // If does not exists then use default
      if (_.isUndefined(val) || _.isNull(val)){
        val = source.default;
      }

      _this.data[source.key] = val
    });
  },

  _processInitFunctions: function() {
    var _this = this;

    if (!_.isUndefined(this.init_functions) && !_.isNull(this.init_functions) &&
        !_.isEmpty(this.init_functions)){

      _.each(this.init_functions, function(func) {

        if (!_this[func] && !_.isFunction(_this[func])){
          throw 'View '+this.name+' does not contain function: '+func;
          return;
        }
        _.bindAll(_this,func);

        _this[func].call(this);
      });
    }
  },

  _processAttributes: function() {
    this.$el.attr('data-view-name',this.name);
    this.$el.attr('data-view-cid',this.cid);
  },

  addView: function(view_name, data, selector){
    var view;

    if (_.has(App.Views, view_name)) {
      var view = new App.Views[view_name]({parent: this, hash: {data: data}});
    }
    else if (_.has(App.Components, view_name)){
      var view = new App.Components[view_name]({parent: this, hash: {data: data}});
    }
    else {
      console.warn('View or Component '+view_name+'does not exist.');
      return;
    }
    var view = new App.Views[view_name]({parent: this, hash: {data: data}});
    this.children[view.cid] = view;
    view.render();
    $selector = this.$el.find(selector);
    view.appendTo($selector);
    return view;
  },

  removeView: function(view){
    view.remove();
    delete this.children[view.cid];
  },

  _addChildView: function(view) {
    // Find the placeholder for where to put the view's markup
    var selector = view.tagName+'[data-view-name="'+view.name+'"]'+
                                '[data-view-cid="'+view.cid+'"]';
    var $placeholder = this.$el.find(selector);
    view.render();
    $placeholder.replaceWith(view.$el);
  },

  render: function() {
    var _this = this;

    _.each(this.children,function(view){
      _this.removeView(view);
    })

    if (!!this.template){
      this.$el.html(this.template(this));

      // Add the children in their dom place
      _.each(this.children,function(view,key){
        _this._addChildView(view);
      });
    }

    this.trigger('rendered',this);
    return this;
  },

  appendTo: function(selector) {
    this.$el.appendTo(selector);
    return this;
  }
});
