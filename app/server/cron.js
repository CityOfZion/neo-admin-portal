SyncedCron.add({
  name: 'Fetch market data',
  schedule: function(parser) {
    return parser.recur().every(10).second();
  },
  job: function() {
    Meteor.call('getGasPrice', (err, res) => {
      if (!err) {
        const data = res[0];
        Market.upsert({id: data.id}, {$set: data});
      } else {
        console.log(err);
      }
    });
  
    Meteor.call('getNeoPrice', (err, res) => {
      if (!err) {
        const data = res[0];
        Market.upsert({id: data.id}, {$set: data});
      } else {
        console.log(err);
      }
    });
  }
});

SyncedCron.start();
