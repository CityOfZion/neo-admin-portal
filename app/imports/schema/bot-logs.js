export default new SimpleSchema({
  processId: {
    type: String,
    label: 'Process ID'
  },
  botName:{
    type: String,
    label: 'Bot name'
  },
  log: {
    type: String,
    label: 'Message'
  },
  dateInserted: {
    type: Date,
    label: 'Date'
  }
});