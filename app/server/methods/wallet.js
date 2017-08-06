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
  },
  getNeoPrice() {
    try {
      const result = HTTP.call('GET', 'https://api.coinmarketcap.com/v1/ticker/neo/?convert=USD');
      return result.data;
    } catch (e) {
      return false;
    }
  },
  getGasPrice() {
    try {
      const result = HTTP.call('GET', 'https://api.coinmarketcap.com/v1/ticker/Antcoin/?convert=USD');
      return result.data;
    } catch (e) {
      return false;
    }
  }
});