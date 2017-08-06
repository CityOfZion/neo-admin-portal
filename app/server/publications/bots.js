import checkRole from '/imports/helpers/check-role.js';

Meteor.publish('bots', function() {
  if (checkRole('admin')) {
    return Bots.find({});
  }
});

Meteor.publish('botById', function(id) {
  if (checkRole('admin')) {
    return Meteor.find({processId: id});
  }
});

Meteor.publish('logsById', function(id) {
  if (checkRole('admin')) {
    BotLogs.find({processId: id});
  }
});