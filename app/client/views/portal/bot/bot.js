TemplateController('botOverview', {
  onCreated() {
    this.autorun(() => {
      Meteor.subscribe('bots');
    });
  },
  events: {
    'click .bot-interaction'(e) {
      const button = $(e.currentTarget);
      const name = button.data('name');

      const bot = Bots.findOne({name: name});
      let method = false;
      switch(bot.status) {
        case 'started':
          method = 'stopBot';
          break;
        case 'stopped':
          method = 'startBot';
          break;
        case 'not-installed':
          method = 'installBot';
          break;
      }
      if(method !== false) {
        Meteor.call(method, name, function(err, res) {
          console.log(err, res);
        })
      }
    },
    'click .bot-update'(e) {
      const button = $(e.currentTarget);
      const name = button.data('name');
      Meteor.call('updateBot', name, function(err, res) {
        console.log(err, res);
      })
    }
  },
  helpers: {
    bots() {
      return Bots.find({});
    },
    buttonClass(status) {
      switch(status) {
        case 'started':
          return 'danger';
        case 'stopped':
          return 'success';
        default:
          return 'warning';
      }
    },
    buttonLabel(status) {
      switch(status) {
        case 'started':
          return 'Stop';
        case 'stopped':
          return 'Start';
        default:
          return 'Install';
      }
    }
  }
});