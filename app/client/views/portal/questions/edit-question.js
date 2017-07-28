TemplateController('editQuestion', {
  onCreated() {
    Tracker.autorun(() => {
      Meteor.subscribe('phraseById', Router.current().params.id);
    })
  },
  helpers: {
    getDocument() {
      const result = Phrases.findOne({});
      return result;
    }
  }
});