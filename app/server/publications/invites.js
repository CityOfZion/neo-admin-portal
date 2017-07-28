Meteor.publish('invites', function() {
  return Invites.find({"user._id": this.userId});
});