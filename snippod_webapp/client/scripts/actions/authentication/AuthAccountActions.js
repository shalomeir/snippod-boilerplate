'use strict';

var Reflux = require('reflux'),
    $ = require('jquery'),
    router = require('../../router'),
    { postForm }= require('../../utils/RESTCall'),
    Cookies = require('cookies-js'),
    request = require('superagent'),
    csrf = require('superagent-csrf'),
    accountDefault = require('../../constants/defaults').account,
    authDefault = require('../../constants/defaults').auth;
//var prefix = require('superagent-prefix')(apiPath);

require('../../utils/serialization');

var MessagesActions = require('./../subs/MessagesActions'),
    UIActions = require('./../commons/UIActions'),
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
  postForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.login.completed.preEmit = function(response) {
  MessagesActions.setLoginSuccessMessages(response.body);
  UIActions.hideOverlay();
  PageActions.transitionToReturnpage();
  return response.body;
};
AuthAccountActions.login.failed.preEmit = function(response) {
  //MessagesActions.setLoginErrorsMessages(response.body);
  MessagesActions.setComponentMessages(response.body);
  return response.body;
};

AuthAccountActions.preLogin.preEmit = function(form, callback) {
  var newForm = form || document.createElement('form');
  newForm.setAttribute('action', '/auth/login/');
  postForm(newForm, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.preLogin.completed.preEmit = function(response) {
  MessagesActions.setLoginSuccessMessages(response.body);
  PageActions.transitionToReturnpage();
  return response.body;
};
AuthAccountActions.preLogin.failed.preEmit = function(response) {
  return response.body;
};


AuthAccountActions.logout.preEmit = function() {
  PageActions.setReturnpage(window.location.pathname);
  var form = document.createElement('form');
  form.setAttribute('action', '/auth/logout/');
  postForm(form)
    .then(this.completed)
    .catch(this.completed);
};
AuthAccountActions.logout.completed.preEmit = function() {
  // Reset account to defaults
  AuthAccountActions.setAuth(authDefault);
  AuthAccountActions.setAccount(accountDefault);
  // Delete Cookies
  Cookies.expire('csrftoken');
  Cookies.expire('sessionid');
  // Redirect to returnpage
  router.transitionTo('/empty');
  PageActions.transitionToReturnpage();
};

AuthAccountActions.register.preEmit = function(form, callback) {
  postForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.register.completed.preEmit = function(response) {
  MessagesActions.setRegisterSuccessMessages(response.body);
  UIActions.hideOverlay();
  return response.body;
};
AuthAccountActions.register.failed.preEmit = function(response) {
  MessagesActions.setComponentMessages(response.body);
  return response.body;
};


AuthAccountActions.forgot.preEmit = function(form, callback) {
  alert('This feature is not implemented yet.');
  //postForm(form, cb);
};


/* Account Actions
 ===============================*/
// from setting component
AuthAccountActions.destroy.preEmit= function(form, callback) {
  postForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.destroy.completed.preEmit = function(response) {
  MessagesActions.setRegisterSuccessMessages(response.body);
  router.transitionTo('/');
  AuthAccountActions.logout();
  return response.body;
};
AuthAccountActions.destroy.failed.preEmit = function(response) {
  MessagesActions.setComponentMessages(response.body);
  return response.body;
};


AuthAccountActions.updateSettings.preEmit = function(form, callback) {
  postForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.updateSettings.completed.preEmit = function(response) {
  MessagesActions.setUpdateSettingsSuccessMessages(response.body);
  return response.body;
};
AuthAccountActions.updateSettings.failed.preEmit = function(response) {
  MessagesActions.setComponentMessages(response.body);
  return response.body;
};


AuthAccountActions.updatePassword.preEmit = function(form, callback) {
  postForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};
AuthAccountActions.updatePassword.completed.preEmit = function(response) {
  MessagesActions.setUpdatePasswordSuccessMessages(response.body);
  return response.body;
};
AuthAccountActions.updatePassword.failed.preEmit = function(response) {
  MessagesActions.setComponentMessages(response.body);
  return response.body;
};


module.exports = AuthAccountActions;
