Meteor.methods({
  requestInvite(group, reason) {
    const inviteExists = Invites.find({"group.id": group.id, "user._id": Meteor.userId()}).count();
    console.log('inviteExists', inviteExists);
    if(!inviteExists) {
      return Invites.insert({
        user: Meteor.user(),
        reason: reason,
        group: group,
        dateRequested: new Date()
      });
    }
    return false;
  }
});