import botsLogs from '/imports/schema/bots';
BotLogs = new Meteor.Collection('bot-logs');

BotLogs.attachSchema(botsLogs);