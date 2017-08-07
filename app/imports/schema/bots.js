export default new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    unique: true
  },
  command: {
    type: String,
    label: 'Command'
  },
  arguments: {
    type: [String],
    label: 'Arguments'
  },
  path: {
    type: String,
    label: 'Path'
  },
  repository: {
    type: String,
    label: 'GitHub repository',
    unique: true
  },
  installed: {
    type: Boolean,
    label: 'Installed',
    defaultValue: false
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
    allowedValues: ['started', 'stopped', 'error', 'not-installed'],
    optional: false,
    defaultValue: 'stopped'
  },
  processId: {
    type: String,
    label: 'Process ID',
    optional: true
  }
});