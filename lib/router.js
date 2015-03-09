'use strict';

Router.plugin('auth', {
  authenticate: {
    route: 'home'
  }
});

Router.configure({
  layoutTemplate: 'defaultLayout'
});

Router.route('/', {
  name: 'home',
  template: 'home',
  noAuth: {
    dashboard: 'authenticated'
  },
  onBeforeAction: ['noAuth']
});

Router.route('/authenticated', {
  name: 'authenticated',
  layoutTemplate: 'authenticatedLayout'
});

Router.route('/authenticated/foozers', {
  authorize: {
    allow: function() {
      return Roles.userIsInRole(Meteor.user(), ['foo']);
    },
    template: 'notauthorized'
  },
  name: 'foozers',
  layoutTemplate: 'authenticatedLayout'
});

Router.route('/authenticated/bazzers', {
  authorize: {
    allow: function() {
      return Roles.userIsInRole(Meteor.user(), ['baz']);
    },
    template: 'notauthorized'
  },
  name: 'bazzers',
  layoutTemplate: 'authenticatedLayout'
});
