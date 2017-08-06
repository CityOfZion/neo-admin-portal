import bots from '/imports/schema/bots';
Bots = new Meteor.Collection('bots');

Bots.attachSchema(bots);