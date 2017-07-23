Meteor.publish('findAnswer', function(query) {
  let result;
  if (!query) {
    result =  Phrases.find({}, {limit: 3});
  } else {
    result = Phrases.find(
      {$text: {$search: query}},
      {
        limit: 3,
        fields: {
          score: {$meta: "textScore"}
        },
        sort: {
          score: {$meta: "textScore"}
        }
      }
    );
  }
  return result;
});

Meteor.publish('phrases', function() {
  return Phrases.find({});
});

Meteor.publish('phraseById', function(_id) {
  return Phrases.find({_id: _id});
});