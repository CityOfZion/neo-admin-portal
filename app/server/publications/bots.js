Meteor.publish('bots', function() {
  return Bots.find({});
});

Meteor.publish('botById', function(id) {
  return Meteor.find({processId: id});
});

Meteor.publish('logsById', function(id) {
  BotLogs.find({processId: id});
});