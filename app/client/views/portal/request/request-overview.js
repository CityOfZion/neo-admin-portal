TemplateController('requestOverview', {
  onCreated() {
    this.autorun(() => {
      Meteor.subscribe('invites');
    });
  },
  helpers: {
    invites() {
      return Invites.find({});
    },
    processWarning(invite) {
      return invite.processed ? 'success' : 'danger';
    }
  }
});