'use strict';

var Reflux = require('reflux'),
    router = require('../../router'),
    Im = require('immutable'),
    authDefault = require('../../constants/defaults').auth,
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions');

var AuthStore = Reflux.createStore({

  listenables: AuthAccountActions,

  init: function() {
    this.auth = Im.Map(authDefault);
  },

  getAuth: function() {
    return this.auth.toJS();
  },


  /* Listen AuthAccountActions
   ===============================*/
  onLoginCompleted: function(response) {
    this.auth = this.auth.set('loggedIn', true);
    this.trigger();
  },

  onLoginFailed: function(response) {
    this.auth = this.auth.set('loggedIn', false);
  },

  onPreLoginCompleted: function(response) {
    this.auth = this.auth.set('loggedIn', true);
    this.trigger();
  },

  onPreLoginFailed: function(response) {
    this.auth = this.auth.set('loggedIn', false);
  },

  onRegisterCompleted: function(response) {
    this.auth = this.auth.set('loggedIn', true);
    this.trigger();
  },

  setAuth: function(authData, transitionTo, callback) {
    this.auth = this.auth.merge(Im.Map(authData));
    this.trigger();

    if (transitionTo) {
      router.transitionTo(transitionTo);
    }
    if(typeof callback !== 'undefined') { callback(); }
  }
});

module.exports = AuthStore;
