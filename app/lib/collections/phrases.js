import phraseSchema from '/imports/schema/phrases.js';

Phrases = new Meteor.Collection('phrases');

Phrases.attachSchema(phraseSchema);
