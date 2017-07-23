TemplateController('listQuestions', {
  onCreated() {
    Tracker.autorun(() => {
      Meteor.subscribe('phrases');
    });
  },
  events: {
    'click .question'(e) {
      const id = $(e.currentTarget).data('id');
      console.log('ID', id, $(e.currentTarget));
      Router.go('phrases.edit', {id: id});
    },
    'click #newQuestion'() {
      console.log('new');
      Router.go('phrases.new');
    }
  },
  helpers: {
    questions() {
      return Phrases.find({});
    }
  }
});
