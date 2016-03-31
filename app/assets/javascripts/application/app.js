this.Application = function (options) {

  this._dependencies = [];

  this.Models = {};
  this.Collections = {};
  this.Components = {};
  this.Views = {};
  this.Pages = {};

  this.Component = Backbone.Component.extend();
  this.View = Backbone.View.extend();
  this.Page = this.View.extend();

  this.Collection = Backbone.Collection.extend();
  this.Model = Backbone.Model.extend();

  this._toast = null;
  this._persistent_toast = {};

  /******
  * Set the main layout to the right page
  *******/
  this._setPage = function () {
    // Remove the page if one is currently being shown.
    var $content = $('#main-content');
    var page_name = 'pages/home';//+$content.attr('page-name')
    // Add page if exists
    if (_.has(this.Pages,[page_name])){
      var layout = new this.Views['layouts/main']({hash: {data: {page: page_name}}});
      layout.render();
      layout.appendTo($content);
    }
    else {
      throw "No page content "+page_name+" exists."
    }
  };

  /*******
  * App wide toast controls
  ********/
  this._initToast = function() {
    this._toast = $('paper-toast#toast')[0];
    this._persistent_toast = $('paper-toast#persistent_toast')[0];

    this._toast.addEventListener('iron-overlay-closed',this._closeToast);
    this._persistent_toast.addEventListener('iron-overlay-closed',this._closeToast);
  };

  this.showToast = function (text, duration, full, attributes) {
    this._showToast(this._toast, text, duration, full, attributes);
  };

  this.showSuccess = function (text, full, attributes) {
    attributes = attributes || {};
    if (_.has(attributes, 'class')) {
      if (_.isString(attributes.class)) {
        attributes.class += ' success';
      }
      else {
        attributes.class = 'success';
      }
    }
    else {
      attributes.class = 'success';
    }

    this._showToast(this._toast, text, 3000, full, attributes);
  };

  this.showError = function (text, full, attributes) {
    attributes = attributes || {};
    if (_.has(attributes, 'class')) {
      if (_.isString(attributes.class)) {
        attributes.class += ' error';
      }
      else {
        attributes.class = 'error';
      }
    }
    else {
      attributes.class = 'error';
    }

    this._showToast(this._toast, text, 3000, full, attributes);
  };

  this.showPersistentToast = function (text, full, attributes) {
    this._showToast(this._persistent_toast, text, 0, full, attributes);
  };

  this.showPersistentToast = function (text, full, attributes) {
    this._showToast(this._persistent_toast, text, 0, full, attributes);
  };

  this._showToast = function (toast, text, duration, full, attributes) {
    if (_.isNull(duration) || _.isUndefined(duration)) {
      duration = 3000;
    }
    var _this = this;
    if (!!attributes) {
      _.each(attributes, function(attr, key) {
        if (key == 'class') {
          $(toast).addClass(attr);
        }
        else {
          toast.setAttribute(key, attr);
        }
      });
    }

    if (full) {
      $(toast).addClass('fit-bottom');
    }

    toast.show({
      text: text,
      duration: duration,
    });
  };

  this._closeToast = function(e) {
    toast = e.currentTarget;
    $(toast).removeClass('success');
    $(toast).removeClass('error');
    $(toast).removeClass('fit-bottom');
  };

  /******
  * Import polymer component DEPENDENCIES
  *******/
  this.importDependency = function(dependency) {
    if (!_.contains(this._dependencies, dependency)) {
      Polymer.Base.importHref('/assets/components/'+dependency);
      this._dependencies.push(dependency);
    }
  };

  /*****
  * Adjust the extend function of backbone's classes
  * This change will allow the Application object to
  * store all the created classes (i.e. models, collections, views)
  ******/
  var _registerClass = function (cls, hash) {
    cls_extend = cls.extend;
    cls.extend = function () {
      child = cls_extend.apply(this,arguments);
      if (child.prototype.name){
        hash[child.prototype.name] = child;
      }
      return child;
    }
  };

  _registerClass(this.Model, this.Models);
  _registerClass(this.Collection, this.Collections);
  _registerClass(this.Component, this.Components);
  _registerClass(this.View, this.Views);
  _registerClass(this.Page, this.Pages);
  /*********
  * END REGISTER
  **********/

  _.extend(this, {
    initialize: function() {
      return null;
    },
    ready: function() {
      return null;
    },
    main: function() {
      return null;
    }
  });

  _.extend(this, options);

  this.start = function() {
    this.initialize();
    this.ready();
    this.main();
  };

  return this;
};
