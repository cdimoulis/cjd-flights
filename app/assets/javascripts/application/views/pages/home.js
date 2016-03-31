App.Page.extend({
  name: "pages/home",
  init_functions: [
    'setup',
  ],

  setup: function() {
    this.components = c = {}

    c.text = {
      heading: 'Text',
      img_url: 'assets/text_sm.png',
      attributes: new App.Model({class:'home-card'}),
      content: "Variations of text inputs.",
      footer: "pages/card/footer",
      footer_data: {
        route: '/elements/text',
      },
    };

    c.buttons = {
      heading: 'Buttons',
      heading_color: 'white',
      img_url: 'assets/push_button_sm.jpg',
      attributes: new App.Model({class:'home-card'}),
      content: "Variations of polymer buttons.",
      footer: "pages/card/footer",
      footer_data: {
        route: '/elements/buttons',
      },
    };

    c.toggles = {
      heading: 'Toggles',
      heading_color: 'white',
      img_url: 'assets/b737_switches_sm.jpg',
      attributes: new App.Model({class:'home-card'}),
      content: "Variations of polymer toggle controls.",
      footer: "pages/card/footer",
      footer_data: {
        route: '/elements/toggles',
      },
    };

    c.selection = {
      heading: 'Selection',
      img_url: 'assets/list_sm.jpg',
      attributes: new App.Model({class:'home-card'}),
      content: "Selectable items, lists, etc.",
      footer: "pages/card/footer",
      footer_data: {
        route: "/elements/selection",
      },
    };

    c.misc = {
      heading: 'Miscellaneous',
      heading_color: 'white',
      img_url: 'assets/chicago_grayscale_sm.jpg',
      attributes: new App.Model({class:'home-card'}),
      content: "Miscellaneous components",
      footer: "pages/card/footer",
      footer_data: {
        route: "/elements/misc",
      },
    };

    c.test = {
      heading: 'Test',
      heading_color: 'white',
      img_url: 'assets/whiskey_glasses_sm.jpg',
      attributes: new App.Model({class:'home-card blue_grey'}),
      content: "Just for testing",
      footer: "pages/card/footer",
      footer_data: {
        route: "/elements/test",
      },
    };
  },
});
