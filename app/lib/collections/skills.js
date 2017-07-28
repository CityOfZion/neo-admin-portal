import skills from '/imports/schema/skills';
Skills = new Meteor.Collection('devskills');

Skills.attachSchema(skills);