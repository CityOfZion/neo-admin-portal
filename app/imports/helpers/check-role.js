export default (role) => {
  const roles = role.split('|');
  if(Meteor.userId() && Meteor.user()) {
    for(let i = 0; i < roles.length; i++) {
      if(Roles.userIsInRole(Meteor.userId(), roles[i])) {
        return true;
      }
    }
  }
  return false;
}