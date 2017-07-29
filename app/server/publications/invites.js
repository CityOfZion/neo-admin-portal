Meteor.publish('invites', function() {
  return Invites.find({"user._id": this.userId});
});

Meteor.publish('allUnprocessedInvites', function() {
  return Invites.find({processed: false}, {dateRequested: 1});
});

Meteor.publish('allInvites', function() {
  const invites = Invites.find({});
  console.log('invites', invites.count());
  return invites;
});