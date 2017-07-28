export default new SimpleSchema({
  user: {
    type: Object,
    blackbox: true
  },
  group: {
    type: Object,
    optional: false,
    blackbox: true
  },
  reason: {
    type: String,
    optional: false
  },
  dateRequested: {
    type: Date,
    label: 'Date requested',
    defaultValue: function() {
      return new Date();
    }
  },
  processed: {
    type: Boolean,
    label: 'Processed',
    defaultValue: false
  },
  approved: {
    type: Boolean,
    label: 'Approved',
    defaultValue: false
  }
});