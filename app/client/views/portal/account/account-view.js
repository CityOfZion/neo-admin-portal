TemplateController('accountView', {
  onCreated() {
    this.autorun(() => {
      Meteor.subscribe('userProfile', Router.current().params.id);
    });
  },
  helpers: {
    user() {
      const user = Meteor.users.find({"profile.info.user_id": Router.current().params.id});
      return user;
    }
  }
});