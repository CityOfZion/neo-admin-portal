import slackApiKey from '/imports/helpers/slack-api-key';

Meteor.methods({
  getGroupsList(callback) {
    const apiKey = slackApiKey();
    const groups = SlackAPI.groups.list(apiKey, callback);
    console.log(groups.groups);
    const filteredGroups = [];
    groups.groups.forEach((group) => {
      if(group.name.indexOf('__') === -1) {
        filteredGroups.push(group);
      }
    });
    return filteredGroups;
  }
});
