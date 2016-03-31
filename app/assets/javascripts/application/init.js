this.App = new Application({
  Templates: HandlebarsTemplates,

  initialize: function() {

  },

  ready: function() {
    this._setPage();
    this._initToast();
  },

  main: function() {
  },
});
