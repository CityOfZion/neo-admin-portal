TemplateController('listQuestions', {
  onCreated() {
    Tracker.autorun(() => {
      Meteor.subscribe('phrases');
    });
  },
  events: {
    'click .question'(e) {
      const id = $(e.currentTarget).data('id');
      Router.go('portal.phrases.edit', {id: id});
    },
    'click #newQuestion'() {
      Router.go('phrases.new');
    }
  },
  helpers: {
    questions() {
      return Phrases.find({});
    }
  }
});
