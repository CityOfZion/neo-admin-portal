TemplateController('accountEdit', {
  private: {
    schema: new SimpleSchema({
      "profile.name": {
        type: String,
        label: 'Name',
      },
      "profile.githubUsername": {
        type: String,
        label: 'Github Username'
      },
      "profile.walletAddress": {
        type: String,
        label: 'NEO Wallet Address'
      },
      "profile.skills": {
        type: [String],
        label: 'Skills',
        autoform: {
          noselect: true,
          options: [
            {
              "label" : "C",
              "value" : "C"
            },
            {
              "label" : "C++",
              "value" : "C++"
            },
            {
              "label" : "C#",
              "value" : "C#"
            },
            {
              "label" : "Design",
              "value" : "Design"
            },
            {
              "label" : "Go",
              "value" : "Go"
            },
            {
              "label" : "HTML & CSS",
              "value" : "HTML & CSS"
            },
            {
              "label" : "JavaScript",
              "value" : "JavaScript"
            },
            {
              "label" : "Java",
              "value" : "Java"
            },
            {
              "label" : "Ruby",
              "value" : "Ruby"
            },
            {
              "label" : "SQL",
              "value" : "SQL"
            },
            {
              "label" : "PHP",
              "value" : "PHP"
            },
            {
              "label" : "Python",
              "value" : "Python"
            },
            {
              "label" : "Translating",
              "value" : "Translating"
            }
          ]
        }
      },
      "profile.updatedProfile": {
        type: Boolean,
        autoform: {
          type: "hidden",
          label: false,
          value: 1
        },
        defaultValue: 1
      }
    })
  },
  onRendered() {
    AutoForm.hooks({
      accountDetails: {
        onError(err, err2) {
          console.log(err, err2);
        },
        onSuccess() {
          FlashMessages.sendSuccess('Your profile has been updated');
        }
      }
    });
  },
  onCreated() {
    Tracker.autorun(() => {
      Meteor.subscribe('skills');
    })
  },
  helpers: {
    doc() {
      return Meteor.user();
    },
    schema() {
      return this.schema;
    }
  }
});