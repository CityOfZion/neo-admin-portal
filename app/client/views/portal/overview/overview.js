import checkRole from '/imports/helpers/check-role.js';

TemplateController('overview', {
  state: {
    wallet: false
  },
  onCreated() {
    Meteor.call('getWalletAmount', (err, res) => {
      if(!res) {
        this.state.wallet = {NEO: 0, GAS: 0};
      } else {
        this.state.wallet = res;
      }
    });
    this.autorun(() => {
      if(checkRole('admin')) {
        Meteor.subscribe('allInvites');
      } else {
        Meteor.subscribe('invites');
      }
    })
  },
  helpers: {
    profileUpdated() {
      return !!Meteor.user().profile.updatedProfile;
    },
    invitesPending() {
      console.log(Invites.find({}).count());
      return Invites.find({processed: false}).count();
    },
    invitesSucceeded() {
      return Invites.find({processed: true, approved: true}).count();
    },
    invitesRejected() {
      return Invites.find({processed: true, approved: false}).count();
    },
    walletAmount() {
      return this.state.wallet;
    }
  }
});