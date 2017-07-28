import checkRole from '/imports/helpers/check-role.js';

// Initial route for letting customers subscribe to a client's page
Router.route('/', {
  name: "home",
  action() {
    this.layout('layout');
    this.render("askQuestion", {to: 'content'});
  }
});

Router.route('/portal/', {
  name: "portal",
  title: "Portal",
  onBeforeAction() {
    if(checkRole('user|developer|admin')) {
      Router.go('portal.overview');
    } else {
      Router.go('portal.login');
    }
  },
  action: function(params, queryParams) {
  }
});

Router.route('/portal/login', {
  name: "portal.login",
  onBeforeAction() {
    if(checkRole('user|developer|admin')) {
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

Router.route('/portal/overview', {
  name: "portal.overview",
  title: "Overview",
  onBeforeAction: function() {
    if(!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action: function(params, queryParams) {
    this.render("portalLayout");
    this.render('overview', {to: 'content'});
  }
});

/**
 * Phrases routes
 */
Router.route('/portal/phrases', {
  name: "portal.phrases",
  title: "Phrases overview",
  onBeforeAction: function() {
    if(!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("listQuestions", {to: 'content'});
  }
});

Router.route('/portal/phrases/edit/:id', {
  name: "portal.phrases.edit",
  title: "Edit phrase",
  onBeforeAction: function() {
    if(!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action(params, queryParams) {
    this.layout('portalLayout');
    this.render("editQuestion", {to: 'content'});
  }
});

Router.route('/portal/phrases/new', {
  name: "portal.phrases.new",
  title: "New phrase",
  onBeforeAction: function() {
    if(!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action(params, queryParams) {
    this.layout('portalLayout');
    this.render("newQuestion", {to: 'content'});
  }
});

/**
 * Slack request invite
 */
Router.route('/portal/request', {
  name: "portal.request",
  title: "Requests",
  onBeforeAction: function() {
    if (!checkRole('user|developer')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("requestOverview", {to: 'content'});
  }
});

Router.route('/portal/request/invite', {
  name: "portal.request.invite",
  title: "Request invite",
  onBeforeAction: function() {
    if (!checkRole('user|developer')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("requestInvite", {to: 'content'});
  }
});

/**
 * Account details
 */
Router.route('/portal/account/edit', {
  name: "portal.account.edit",
  title: "Edit account",
  onBeforeAction: function() {
    if(!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    
    this.render("accountEdit", {to: 'content'});
  }
});

Router.route('/portal/account', {
  name: "portal.account",
  title: "Account overview",
  onBeforeAction: function() {
    if(!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("accountOverview", {to: 'content'});
  }
});