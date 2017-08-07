Meteor.publish('market', function() {
  return Market.find({});
});