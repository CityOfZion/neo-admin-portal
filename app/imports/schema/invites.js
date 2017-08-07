export default new SimpleSchema({
  user: {
    type: String,
    label: "User ID"
  },
  group: {
    type: Object,
    optional: false,
    blackbox: true,
    label: "Group"
  },
  reason: {
    type: String,
    optional: false,
    label: "Reason"
  },
  dateRequested: {
    type: Date,
    defaultValue: function() {
      return new Date();
    },
    label: 'Date requested'
  },
  processed: {
    type: Boolean,
    defaultValue: false,
    label: 'Processed'
  },
  approved: {
    type: Boolean,
    defaultValue: false,
    label: 'Approved'
  }
});