import { Meteor } from 'meteor/meteor';
import {getAccess, getUserInfo, getUserGroups, getIdentity} from '/imports/slack/slack-functions.js';

if(Meteor.isServer) {
  
  Slack = {};
  
  OAuth.registerService('slack', 2, null, function (query) {
    const accessToken = getAccess(query).access_token;
    const identity = getIdentity(accessToken);
    const userInfo = getUserInfo(accessToken);
    const userGroups = getUserGroups(accessToken).groups;
    
    return {
      serviceData: {
        id: identity.user.id,
        accessToken: accessToken
      },
      options: {
        profile: {
          name: identity.user.name,
          identity: identity,
          info: userInfo,
          groups: userGroups
        }
      }
    };
  });
  
  Slack.retrieveCredential = function (credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
  };
}