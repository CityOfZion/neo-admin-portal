TemplateController('botOverview', {
  events: {
    'click #start-slackbot'() {
      Meteor.call('startSlackbot', function(err, res) {
        console.log(err, res);
        
      })
    }
  }
  
});