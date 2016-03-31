Handlebars.registerHelper('view', function(view_name, obj){
  var view;

  if (_.has(App.Views, view_name)) {
    view = new App.Views[view_name](obj);
  }
  else if (_.has(App.Components, view_name)) {
    view = new App.Components[view_name](obj);
  }
  else {
    throw "Could not find a view named: "+view_name
    return
  }

  var parent = obj.data.root;
  obj.parent = parent;

  parent.children[view.cid] = view;
  var placeholder = view.$el.wrap('<temp>').parent().html();

  return new Handlebars.SafeString(placeholder);
});

Handlebars.registerHelper('page', function(view_name,obj){
  if (!App.Pages[view_name]){
    throw "Could not find a page named: "+view_name
    return
  }
  var parent = obj.data.root;
  obj.parent = parent;
  var view = new App.Pages[view_name](obj);

  parent.children[view.cid] = view;
  var placeholder = view.$el.wrap('<temp>').parent().html();

  return new Handlebars.SafeString(placeholder);
});
