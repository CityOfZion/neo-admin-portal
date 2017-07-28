import { Meteor } from 'meteor/meteor';

if(Meteor.isServer) {
  Slack = {};
  
  OAuth.registerService('slack', 2, null, function (query) {
    const accessToken = getAccessToken(query);
    const identity = getIdentity(accessToken);
    const userInfo = getUserInfo(accessToken);
    
    return {
      serviceData: {
        id: identity.user.id,
        accessToken: accessToken
      },
      options: {
        profile: {
          name: identity.user.name,
          identity: identity,
          info: userInfo
        }
      }
    };
  });
  
  const getAccessToken = function (query) {
    const config = ServiceConfiguration.configurations.findOne({service: 'slack'});
    if (!config)
      throw new ServiceConfiguration.ConfigError();
    
    let response;
    try {
      response = HTTP.post(
        "https://slack.com/api/oauth.access", {
          headers: {
            Accept: 'application/json'
          },
          params: {
            code: query.code,
            client_id: config.clientId,
            client_secret: OAuth.openSecret(config.secret),
            redirect_uri: query.redirectUri ? query.redirectUri : OAuth._redirectUri('slack', config),
            state: query.state
          }
        });
    } catch (err) {
      throw _.extend(new Error("Failed to complete OAuth handshake with Slack. " + err.message),
        {response: err.response});
    }
    
    if (!response.data.ok) { // if the http response was a json object with an error attribute
      throw new Error("Failed to complete OAuth handshake with Slack. " + response.data.error);
    } else {
      return response.data.access_token;
    }
  };
  
  const getUserInfo = function (accessToken) {
    try {
      const response = HTTP.get(
        "https://slack.com/api/auth.test",
        {params: {token: accessToken}});
      
      return response.data.ok && response.data;
    } catch (err) {
      throw _.extend(new Error("Failed to fetch info from Slack. " + err.message),
        {response: err.response});
    }
  };
  
  const getIdentity = function (accessToken) {
    try {
      const response = HTTP.get(
        "https://slack.com/api/users.identity",
        {params: {token: accessToken}});
      
      return response.data.ok && response.data;
    } catch (err) {
      throw _.extend(new Error("Failed to fetch identity from Slack. " + err.message),
        {response: err.response});
    }
  };
  
  Slack.retrieveCredential = function (credentialToken, credentialSecret) {
    return OAuth.retrieveCredential(credentialToken, credentialSecret);
  };
}