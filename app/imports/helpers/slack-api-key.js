export default () => {
  const team = Teams.findOne({
    id: Meteor.user().profile.identity.team.id
  });
  console.log('TEAM', team.bot);
  return team.bot.app_token;
}