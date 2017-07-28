export default (role) => {
  const roles = role.split('|');
  
  if(Meteor.userId() && Meteor.user()) {
    const userRoles = Meteor.user().roles;
    if(!!userRoles) {
      const role = Meteor.user().roles[0];
      return roles.indexOf(role) > -1;
    }
  }
  
  return false;
}