Template.registerHelper('arrayify', function (obj) {
  let result = [];
  for (let key in obj) result.push({name: key, value: obj[key]});
  return result;
});

Template.registerHelper('paramUserId', function () {
  return {
    _id: Router.current().params._id
  };
});

Template.registerHelper('hasRole', function(role) {
  return Roles.userIsInRole(Meteor.userId(), role);
});

Template.registerHelper('isActiveMenuItem', function (route) {
  return Router.current().route.getName().indexOf(route) >= 0 ? 'active' : '';
});

Template.registerHelper('isOpenMenuItem', function (route) {
  return Router.current().route.getName().indexOf(route) >= 0 ? 'menu-open' : '';
});

Template.registerHelper('getCurrencySymbol', function (shortCode) {
  return i18n('global.currencies.' + shortCode);
});

Template.registerHelper('User', function () {
  console.log(Meteor.user());
  return Meteor.user();
});

Template.registerHelper('UserEmail', function () {
  return Meteor.user().emails[0].address;
});

Template.registerHelper('date', function (dateString = false) {
  console.log('date', moment());
  console.log('date', moment().format(i18n('format.date')));
  return (!dateString) ? moment().format(i18n('format.date')) : moment(dateString).format(i18n('format.date'));
});

Template.registerHelper('yearsList', (count, from) => {
  if (isNaN(parseFloat(from)) || !isFinite(from)) {
    from = new Date().getFullYear();
  }
  
  console.log('from', from);
  const years = [];
  for (let y = from; y <= from + count; y++) {
    years.push(y);
  }
  console.log('years', years);
  return years;
});

Template.registerHelper('monthsList', function () {
  const months = [];
  for (let y = 1; y <= 12; y++) {
    months.push(('0' + y).slice(-2));
  }
  return months;
});

Template.registerHelper('meteorSettings', function () {
  return Meteor.settings;
});