import { Meteor } from 'meteor/meteor';

if(Meteor.isClient) {
  Slack = {};

// Request Slack credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
  Slack.requestCredential = function (options, credentialRequestCompleteCallback) {
    // support both (options, callback) and (callback).
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
      credentialRequestCompleteCallback = options;
      options = {};
    }
  
    const config = ServiceConfiguration.configurations.findOne({service: 'slack'});
    if (!config) {
      credentialRequestCompleteCallback && credentialRequestCompleteCallback(
        new ServiceConfiguration.ConfigError());
      return;
    }
    
    // For some reason, slack converts underscores to spaces in the state
    // parameter when redirecting back to the client, so we use
    // `Random.id()` here (alphanumerics) instead of `Random.secret()`
    // (base 64 characters).
    const credentialToken = Random.id();
  
    const scope = (options && options.requestPermissions) || [];
    const flatScope = _.map(scope, encodeURIComponent).join(',');
  
    const loginStyle = OAuth._loginStyle('slack', config, options);
  
    const loginUrl =
      'https://slack.com/oauth/authorize' +
      '?client_id=' + config.clientId +
      '&response_type=code' +
      '&scope=' + flatScope +
      '&redirect_uri=' + OAuth._redirectUri('slack', config) +
      '&state=' + OAuth._stateParam(loginStyle, credentialToken);
    
    // slack box gets taller when permissions requested.
    let height = 620;
    if (_.without(scope, 'basic').length)
      height += 130;
    
    OAuth.launchLogin({
      loginService: 'slack',
      loginStyle: loginStyle,
      loginUrl: loginUrl,
      credentialRequestCompleteCallback: credentialRequestCompleteCallback,
      credentialToken: credentialToken,
      popupOptions: {width: 900, height: height}
    });
    
    /*
      OAuth.showPopup(
        loginUrl,
        _.bind(credentialRequestCompleteCallback, null, credentialToken),
        {width: 900, height: height}
      );
    */
  };
}