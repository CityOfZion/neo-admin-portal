TemplateController('overview', {
  onCreated() {
    this.autorun(() => {
      Meteor.subscribe('invites');
    })
  },
  helpers: {
    profileUpdated() {
      return !!Meteor.user().profile.updatedProfile;
    },
    invitesPending() {
      return Invites.find({processed: false}).count();
    },
    invitesSucceeded() {
      return Invites.find({processed: true, approved: true}).count();
    },
    invitesRejected() {
      return Invites.find({processed: true, approved: false}).count();
    }
  }
});