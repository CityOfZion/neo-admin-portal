const Autolinker = require( 'autolinker' );

TemplateController('askQuestion', {
  state: {
    question: ''
  },
  onCreated() {
    Tracker.autorun(() => {
      Meteor.subscribe('findAnswer', this.state.question);
    })
  },
  events: {
    'submit'(e) {
      e.preventDefault();
      this.state.question = $('#question').val();
    },
    'keyup #question'(e) {
      e.preventDefault();
      this.state.question =  $('#question').val();
    }
  },
  helpers: {
    answers() {
      if (Session.get("searchValue")) {
        return Phrases.find({}, { sort: [["score", "desc"]] });
      } else {
        return Phrases.find({});
      }
    },
    parse(text) {
      // Make links
      let result = Autolinker.link(text);
  
      // Parse * into bold
      const parseBold = new RegExp('\\*([^)]+)\\*', 'g');
      const matches = parseBold.exec(result);
      matches.forEach((match) => {
        result = result.replace('*' + match + '*', '<b>' + match + '</b>');
      });
      
      result = result.replace(/(?:\r\n|\r|\n)/g, '<br />');
      return result;
    }
  }
});