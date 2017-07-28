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
      return invite.approved ? 'success' : 'danger';
    },
    isApproved(approved) {
      return approved ? 'yes' : 'no';
    },
    hasInvites() {
      const invites = Invites.find({}).count();
      console.log(invites, !!invites);
      return invites;
    }
  }
});