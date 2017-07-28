TemplateController('portalLayout', {
  onRendered() {
    FlashMessages.configure({
      autoHide: true,
      hideDelay: 5000,
      autoScroll: true
    });
    AutoForm.setDefaultTemplate('bootstrap3');
  },
  events: {
    'click .sign-out'() {
      Meteor.logout(function(err){
        console.log(err);
      });
    },
    'click .sidebar-toggle'() {
      const skin = $('.skin-black');
      if(skin.hasClass('sidebar-collapse')) {
        skin.removeClass('sidebar-collapse');
      } else {
        skin.addClass('sidebar-mini sidebar-collapse');
      }
    }
  }
});