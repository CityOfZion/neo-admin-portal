const EmailObject = new SimpleSchema({
  address: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  verified: {
    type: Boolean,
    autoValue: function() { return true; }, // don't require email verification
    optional: true
  },
});

const UserPersonalInformation = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  surname: {
    type: String,
    optional: true,
  },
  team: {
    type: String,
    optional: true
  },
  team_id: {
    type: String,
    optional: true
  },
  url: {
    type: String,
    optional: true
  },
  user_id: {
    type: String,
    optional: true
  },
  registrationDate: {
    type: Date,
    optional: true,
  },
  status: {
    type: String,
    allowedValues: ['PENDING', 'APPROVED', 'REJECTED'],
    optional: true,
  },
  registerClientIP: {
    type: String,
    optional: true,
  },
  domains: {
    type: [String],
    optional: true
  },
  language: {
    type: String,
    allowedValues: ['en', 'jp', 'ko'],
    defaultValue: 'en',
    optional: true
  },
  identity: {
    type: Object,
    optional: true
  }
});

const userSchema = new SimpleSchema({
  profile: {
    type: UserPersonalInformation
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
    blackbox: true,
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
});

export { userSchema };