TemplateController('portalLayout', {
  onRendered() {
    FlashMessages.configure({
      autoHide: true,
      hideDelay: 5000,
      autoScroll: true
    });
    AutoForm.setDefaultTemplate('bootstrap3');
    window.document.title = 'NEO Portal - ' + Router.current().options.route.options.title;
  },
  events: {
    'click .sign-out'() {
      Meteor.logout(function(err){
        console.log(err);
      });
    },
    'click .sidebar-toggle'() {
      const skin = $('.skin-black');
      if(skin.hasClass('sidebar-open')) {
        skin.removeClass('sidebar-open');
        $('body').removeClass('sidebar-open');
      } else {
        skin.addClass('sidebar-mini sidebar-open');
        $('body').addClass('sidebar-mini sidebar-open');
      }
    }
  }
});