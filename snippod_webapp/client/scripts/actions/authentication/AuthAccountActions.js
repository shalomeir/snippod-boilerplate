'use strict';

import history from '../../utils/History.js'

var Reflux = require('reflux'),
    $ = require('jquery'),
    ga = require('react-ga'),
    { requestPostForm }= require('../../utils/RESTCall'),
    Cookies = require('cookies-js'),
    accountDefault = require('../../constants/defaults').account,
    authDefault = require('../../constants/defaults').auth;
//var prefix = require('superagent-prefix')(apiPath);

var MessagesActions = require('./../subs/MessagesActions'),
    PostsActions = require('./../../actions/posts/PostsActions'),
    UIActions = require('./../commons/UIActions'),
    UsersActions = require('./../users/UsersActions'),
    PageActions = require('./../commons/PageActions');

var AuthAccountActions = Reflux.createActions({
  //from component
  'login':{ asyncResult: true },
  'preLogin':{ asyncResult: true },
  'logout':{ asyncResult: true },
  'register':{ asyncResult: true },
  'forgot':{},
  'destroy':{ asyncResult: true },
  'updateSettings':{ asyncResult: true },
  'updatePassword':{ asyncResult: true },

  //from action to store
  'setAccount':{},
  'setAuth':{}
});


/* Auth Actions
 ===============================*/
AuthAccountActions.login.preEmit = function(form, callback) {
  ga.event({
    category: 'AuthAccountActions',
    action: 'loginPreEmit'
  });

  requestPostForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.login.completed.preEmit = function(response) {
  ga.event({
    category: 'AuthAccountActions',
    action: 'loginCompleted'
  });

  UIActions.hideOverlay();
  PostsActions.clearAllPostsCommentsStore(PostsActions.refreshDataFromStore);
  PageActions.transitionToReturnpage();
};
AuthAccountActions.login.failed.preEmit = function(response) {
  ga.event({
    category: 'AuthAccountActions',
    action: 'loginFailed'
  });

  MessagesActions.setComponentMessages(response.body);
};

AuthAccountActions.preLogin.preEmit = function(form, callback) {
  var newForm = form || document.createElement('form');
  newForm.setAttribute('action', '/auth/login/');
  requestPostForm(newForm, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.preLogin.completed.preEmit = function(response) {
  PostsActions.clearAllPostsCommentsStore(PostsActions.refreshDataFromStore);
  PageActions.transitionToReturnpage();
};


AuthAccountActions.logout.preEmit = function() {
  ga.event({
    category: 'AuthAccountActions',
    action: 'logout'
  });

  PageActions.setReturnpage(window.location.pathname);
  var form = document.createElement('form');
  form.setAttribute('action', '/auth/logout/');
  requestPostForm(form)
    .then(this.completed)
    .catch(this.completed);
};
AuthAccountActions.logout.completed.preEmit = function(response) {

  // Reset account to defaults
  AuthAccountActions.setAuth(authDefault);
  AuthAccountActions.setAccount(accountDefault);

  // Delete Cookies
  Cookies.expire('csrftoken');
  Cookies.expire('sessionid');
  // Redirect to returnpage
  history.replaceState(null, '/empty');
  PostsActions.clearAllPostsCommentsStore(PostsActions.refreshDataFromStore);
  PageActions.transitionToReturnpage();

};

AuthAccountActions.register.preEmit = function(form, callback) {
  ga.event({
    category: 'AuthAccountActions',
    action: 'registerPreEmit'
  });

  requestPostForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.register.completed.preEmit = function(response) {
  ga.event({
    category: 'AuthAccountActions',
    action: 'registerCompleted'
  });

  UIActions.hideOverlay();
};
AuthAccountActions.register.failed.preEmit = function(response) {
  ga.event({
    category: 'AuthAccountActions',
    action: 'registerFailed'
  });

  MessagesActions.setComponentMessages(response.body);
};

AuthAccountActions.forgot.preEmit = function(form, callback) {
  alert('This feature is not implemented yet.');
  //requestPostForm(form, cb);
};


/* Account Actions
 ===============================*/
// from setting component
AuthAccountActions.destroy.preEmit= function(form, callback) {
  requestPostForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.destroy.completed.preEmit = function(response) {
  history.pushState('/')
  AuthAccountActions.logout();
};

AuthAccountActions.updateSettings.preEmit = function(form, callback) {
  requestPostForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.updateSettings.completed.preEmit = function(response) {
  PostsActions.clearAllPostsCommentsStore(PostsActions.refreshDataFromStore);
  UsersActions.clearUserStore(PostsActions.refreshDataFromStore);
};

AuthAccountActions.updatePassword.preEmit = function(form, callback) {
  requestPostForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};

module.exports = AuthAccountActions;
