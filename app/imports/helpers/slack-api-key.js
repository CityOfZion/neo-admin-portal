export default (teamId) => {
  let team;
  if(teamId === undefined) {
    team = Teams.findOne({
      id: Meteor.user().profile.identity.team.id
    });
  } else {
    team = Teams.findOne({
      id: teamId
    });
  }
  return team.bot.app_token;
}