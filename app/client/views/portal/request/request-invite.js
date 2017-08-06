TemplateController('requestInvite', {
  state: {
    groups: false,
    hasGroups: false
  },
  onCreated() {
    Meteor.call('getGroupsList', (err, res) => {
      if(!err) {
        this.state.groups = res;
      }
    });
    this.autorun(() => {
      Meteor.subscribe('invites');
    });
  },
  helpers: {
    groupList() {
      const invites = Invites.find({"user": Meteor.userId()}).fetch();
      const groups = this.state.groups;
      let count = 0;
      if(groups !== false) {
        this.state.groups.forEach((group, index) => {
          group.hasInvite = false;
          invites.forEach((invite) => {
            if(invite.group.id === group.id) {
              group.hasInvite = true;
              count++;
            }
          });
        });
      }
      this.state.hasGroups = !!count;
      return groups;
    },
    hasUpdated() {
      return !!Meteor.user().profile.updatedProfile;
    },
    hasInvite() {
      return this.state.hasGroups;
    }
  },
  events: {
    'click button.request'(e) {
      const groupId = $(e.currentTarget).data('id');
      const objectId = $(e.currentTarget).data('object');
      const reason = $(`textarea[data-id="${groupId}"]`).val();
      if(reason.trim() === '') {
        $(e.currentTarget).parent().addClass('has-error');
      } else {
        const group = this.state.groups[objectId];
        Meteor.call('requestInvite', group, reason, (err, req) => {
          FlashMessages.sendSuccess('Your invite request has been sent');
        })
      }
    },
  }
});