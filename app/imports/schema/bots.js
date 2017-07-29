export default new SimpleSchema({
  name: {
    type: String,
    label: 'Name'
  },
  command: {
    type: String,
    label: 'Command'
  },
  startDate:{
    type: Date,
    label: 'Date started',
    optional: true
  },
  dateStopped: {
    type: Date,
    label: 'Date stopped',
    optional: true
  },
  status: {
    type: String,
    label: 'Status',
    allowedValues: ['active', 'stopped', 'error'],
    optional: true
  },
  processId: {
    type: String,
    label: 'Process ID',
    optional: true
  }
});