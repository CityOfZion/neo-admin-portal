Meteor.publish('skills', function() {
  return Skills.find({});
});