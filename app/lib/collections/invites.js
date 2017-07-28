import invitesSchema from '/imports/schema/invites.js';

Invites = new Meteor.Collection('invites');

Invites.attachSchema(invitesSchema);
