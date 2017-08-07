import checkRole from '/imports/helpers/check-role.js';
const currency = require('currency-formatter');


TemplateController('overview', {
  private: {
    getRemoteData() {
      Meteor.call('getWalletAmount', (err, res) => {
        if (!res) {
          this.state.wallet = {NEO: 0, GAS: 0};
        } else {
          this.state.wallet = res;
        }
      });
    }
  },
  state: {
    wallet: false
  },
  onCreated() {
    
    this.getRemoteData();
    
    Meteor.setInterval(this.getRemoteData.bind(this), 10000);
    
    this.autorun(() => {
      Meteor.subscribe('market');
      if(checkRole('admin')) {
        Meteor.subscribe('allInvites');
      } else {
        Meteor.subscribe('invites');
      }
    })
  },
  helpers: {
    profileUpdated() {
      return !!Meteor.user().profile.updatedProfile;
    },
    invitesPending() {
      return Invites.find({processed: false}).count();
    },
    invitesSucceeded() {
      return Invites.find({processed: true, approved: true}).count();
    },
    invitesRejected() {
      return Invites.find({processed: true, approved: false}).count();
    },
    walletAmount() {
      return this.state.wallet;
    },
    neoPrice() {
      return Market.findOne({id: 'neo'});
    },
    gasPrice() {
      return Market.findOne({id: 'antcoin'});
    },
    usdNeoPrice(neoAmount) {
      const neo = Market.findOne({id: 'neo'});
      if(neo) {
        const amount = neo.price_usd * neoAmount;
        if(amount >= 0) {
          return currency.format(amount, { code: 'USD' })
        }
      }
      
      return currency.format(0, { code: 'USD' });
    },
    usdGasPrice(gasAmount) {
      const anc = Market.findOne({id: 'antcoin'});
      if(anc) {
        const amount = anc.price_usd * gasAmount;
        if(amount >= 0) {
          return currency.format(amount, { code: 'USD' })
        }
      }
      
      return currency.format(0, { code: 'USD' });
    }
  }
});