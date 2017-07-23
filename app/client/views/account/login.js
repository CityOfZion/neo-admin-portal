TemplateController('login', {
  events: {
    'click #login'(event) {
      Meteor.loginWithSlack({requestPermissions: ['identity.email', 'identity.basic', 'identity.team']}, (res, err) => {
        console.log('test', Meteor.userId(), Meteor.user());
      })
    }
  }
});