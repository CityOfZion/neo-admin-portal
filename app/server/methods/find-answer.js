Meteor.methods({
  findAnswer(query) {
    console.log('finding: ', query);
    const result = Phrases.find({"$text": {"$search": query}},{ score: { $meta: "textScore" }}, {limit: 5});
    console.log('res', result.fetch());
    return result;
  }
});