import {userSchema} from "/imports/schema/users";

if(Meteor.isServer) {
  Meteor.users.after.insert(function (userId, doc) {
    Roles.addUsersToRoles(doc._id, ['user']);
  });
}

Meteor.users.attachSchema(userSchema);