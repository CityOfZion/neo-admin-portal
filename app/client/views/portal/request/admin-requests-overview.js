TemplateController('adminRequestsOverview', {
  onCreated() {
    this.autorun(() => {
      Meteor.subscribe('allUnprocessedInvites');
    });
  },
  helpers: {
    invites() {
      return Invites.find();
    }
  },
  events: {
    'click .profile'(e) {
      const userId = $(e.currentTarget).data('user');
      Router.go('portal.account.view', {id: userId});
    },
    'click .approve'(e) {
      const userId = $(e.currentTarget).data('user');
      const groupId = $(e.currentTarget).data('group');
      
      Meteor.call('inviteUserToGroup', groupId, userId, function(err, res)  {
        console.log(err, res);
        if(err || res.ok === false) {
          FlashMessages.sendError('<p class="text-center">There was an error inviting the user <br> ' + res.error + '</p>');
        } else {
          FlashMessages.sendSuccess('<p class="text-center">The user has been invited to the channel</p>');
        }
      });
    },
    'click .reject'(e) {
      const userId = $(e.currentTarget).data('user');
      const groupId = $(e.currentTarget).data('group');
  
      Meteor.call('rejectUserInvite', groupId, userId, function(err, res)  {
        if(err) {
          FlashMessages.sendError('<p class="text-center">There was an error rejecting the user</p>');
        } else {
          FlashMessages.sendSuccess('<p class="text-center">The user has been rejected</p>');
        }
      });
    }
  }
});