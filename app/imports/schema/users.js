const userSchema = new SimpleSchema({
  profile: {
    type: Object,
    blackbox: true
  },
  roles: {
    type: Array,
    optional: true
  },
  'roles.$': {
    type: String
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

export { userSchema };