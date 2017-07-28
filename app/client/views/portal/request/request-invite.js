TemplateController('requestInvite', {
  state: {
    groups: false
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
      const invites = Invites.find({"user._id": Meteor.userId()}).fetch();
      const groups = this.state.groups;
      const outGroups = [];
      if(groups !== false) {
        this.state.groups.forEach((group, index) => {
          group.hasInvite = false;
          invites.forEach((invite) => {
            if(invite.group.id === group.id) {
              group.hasInvite = true;
            }
          });
        });
      }
      
      return groups;
    },
    hasUpdated() {
      return !!Meteor.user().profile.updatedProfile;
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