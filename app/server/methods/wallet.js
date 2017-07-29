Meteor.methods({
  getWalletAmount() {
    try {
      if(Meteor.user().profile.walletAddress) {
        const result = HTTP.call('GET', 'http://api.neonwallet.com/v1/address/balance/' + Meteor.user().profile.walletAddress);
        return result.data;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
    
  }
});