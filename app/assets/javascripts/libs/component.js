Backbone.Component = Backbone.View.extend({

  addView: function(view_name, data){
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
    this.children[view.cid] = view;
    view.render();
    Polymer.dom(this.el).appendChild(view.el);

    return view;
  },

  removeView: function(view){
    Polymer.dom(this.el).removeChild(view.el);
    view.remove();
    delete this.children[view.cid];
  },

  _addChildView: function(view, $template) {
    view.render();

    // Find the placeholder for where to put the view's markup
    var selector = view.tagName+'[data-view-name="'+view.name+'"]'+
                                '[data-view-cid="'+view.cid+'"]';
    var $placeholder = $template.find(selector);
    // Check if the template is the view to replace
    if (!$placeholder.length && $template.is(selector)) {
      $template = view.$el;
    }
    else {
      $placeholder.replaceWith(view.$el);
    }
    return $template;
  },

  render: function() {
    var _this = this;

    _.each(this.children,function(view){
      _this.removeView(view);
    })

    if (!!this.template){
      var template = this.template(this);

      // Consider plain text in the template. Could cause a problem if rendering
      // this way since it will not become a node. For now wrapping text in
      // <span> works, but if not here is a start.
      // var pre = template.replace("\n",'').replace("\r",'');
      // var text = pre.replace(/<([^]+)>(.*?)<\/([^]+)>/g, "");
      // console.log('\ntemplate', pre);
      // console.log('text', text);
      var $template = $(template);
      // Add the children in their dom place
      _.each(this.children,function(view,key){
        $template = _this._addChildView(view, $template);
      });

      $template.each(function(index, node) {
        Polymer.dom(_this.el).appendChild(node);
      });
    }

    this.trigger('rendered',this);
    return this;
  },
});
