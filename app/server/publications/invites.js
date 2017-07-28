Meteor.publish('invites', function() {
  return Invites.find({"user._id": this.userId});
});

Meteor.publish('allUnprocessedInvites', function() {
  return Invites.find({processed: false}, {dateRequested: 1});
});