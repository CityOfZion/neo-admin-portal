import slackApiKey from '/imports/helpers/slack-api-key';

Meteor.methods({
  requestInvite(group, reason) {
    const inviteExists = Invites.find({"group.id": group.id, "user._id": Meteor.userId()}).count();
    console.log('inviteExists', inviteExists);
    if(!inviteExists) {
      return Invites.insert({
        user: Meteor.userId(),
        reason: reason,
        group: group,
        dateRequested: new Date()
      });
    }
    return false;
  },
  inviteUserToGroup(groupId, userId) {
    const user = Meteor.users.findOne({_id: userId});
    const apiKey = slackApiKey(user.profile.identity.team.id);
    const slackUserId = user.profile.identity.user.id;
    const invited = SlackAPI.groups.invite(apiKey, groupId, slackUserId);
    if(invited.ok) {
      Invites.update({
        "user": slackUserId,
        "group.id": groupId
      }, {$set: {
        processed: true,
        approved: true
      }})
    }
    return invited;
  },
  rejectUserInvite(groupId, userId) {
    Invites.update({
      "user.profile.identity.user.id": userId,
      "group.id": groupId
    }, {$set: {
      processed: true,
      approved: true
    }})
  }
});