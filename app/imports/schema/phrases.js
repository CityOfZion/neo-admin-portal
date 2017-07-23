export default new SimpleSchema({
  skill: {
    label: 'Skill name',
    type: String
  },
  answer: {
    label: 'Answer',
    type: String,
    autoform: {
      type: 'textarea',
      rows: 5
    }
  },
  phrases: {
    label: 'Phrases',
    type: [String]
  }
});