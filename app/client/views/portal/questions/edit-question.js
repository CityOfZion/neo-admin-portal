TemplateController('editQuestion', {
  onCreated() {
    console.log('ROUTER', Router.current().params);
    Tracker.autorun(() => {
      Meteor.subscribe('phraseById', Router.current().params.id);
    })
  },
  helpers: {
    getDocument() {
      console.log('trying to get id: ', Router.current().params.id);
      const result = Phrases.findOne({});
      console.log('RESULT', result);
      return result;
    }
  }
});