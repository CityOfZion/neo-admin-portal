if (Meteor.isServer) {
  Phrases._ensureIndex({
    "$**": "text"
  });
  Phrases.allow({
    'insert': function (userId, doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true;
    }
  });
}