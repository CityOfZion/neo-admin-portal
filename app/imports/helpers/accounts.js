const isAdmin = () => {
  return (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin']));
};

const isClient = () => {
  return (Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['client']));
};

export { isAdmin, isClient };