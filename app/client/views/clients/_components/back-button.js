TemplateController('backButton', {
  events: {
    'click #backButton'() {
      history.back();
    }
  }
});