import {isAdmin, isClient} from '/imports/helpers/accounts.js';
// Initial route for letting customers subscribe to a client's page
Router.route('/', {
  name: "home",
  action() {
    this.layout('layout');
    this.render("askQuestion", {to: 'content'});
  }
});

Router.route('/portal/', {
  name: "portal.landing",
  onBeforeAction() {
    if(isAdmin() || isClient()) {
      Router.go('portal.overview');
    } else {
      Router.go('portal.login');
    }
  },
  action: function(params, queryParams) {
    this.render("layout");
    this.render('login', {to: 'content'});
  }
});

Router.route('/portal/login', {
  name: "portal.login",
  onBeforeAction() {
    if(isAdmin() || isClient()) {
      Router.go('portal.overview');
    } else {
      this.next();
    }
  },
  action: function(params, queryParams) {
    this.render("layout");
    this.render('login', {to: 'content'});
  }
});

Router.route('/portal/register', {
  name: "portal.register",
  onBeforeAction() {
    if(isAdmin() || isClient()) {
      Router.go('portal.overview');
    } else {
      this.next();
    }
  },
  action: function(params, queryParams) {
    this.render("layout");
    this.render('register', {to: 'content'});
  }
});

Router.route('/portal/overview', {
  name: "portal.overview",
  onBeforeAction: function() {
    if(!isAdmin()) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action: function(params, queryParams) {
    this.render("layout");
    this.render('overview', {to: 'content'});
  }
});

Router.route('/portal/phrases/list', {
  name: "portal.phrases.list",
  onBeforeAction: function() {
    if(!isAdmin()) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('layout');
    this.render("listQuestions", {to: 'content'});
  }
});

Router.route('/portal/phrases/edit/:id', {
  name: "portal.phrases.edit",
  onBeforeAction: function() {
    if(!isAdmin()) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action(params, queryParams) {
    console.log(params, queryParams);
    this.layout('layout');
    this.render("editQuestion", {to: 'content'});
  }
});

Router.route('/portal/phrases/new', {
  name: "portal.phrases.new",
  onBeforeAction: function() {
    if(!isAdmin()) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action(params, queryParams) {
    console.log(params, queryParams);
    this.layout('layout');
    this.render("newQuestion", {to: 'content'});
  }
});