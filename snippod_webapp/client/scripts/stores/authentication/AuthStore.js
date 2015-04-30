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
    this.trigger(this.auth.toJS());
  },

  onLoginFailed: function(response) {
    this.auth = this.auth.set('loggedIn', false);
  },

  onPreLoginCompleted: function(response) {
    this.auth = this.auth.set('loggedIn', true);
    this.trigger(this.auth.toJS());
  },

  onPreLoginFailed: function(response) {
    this.auth = this.auth.set('loggedIn', false);
  },

  onRegisterCompleted: function(response) {
    this.auth = this.auth.set('loggedIn', true);
    this.trigger(this.auth.toJS());
  },

  setAuth: function(authData, transitionTo) {
    this.auth = this.auth.merge(Im.Map(authData));
    this.trigger(this.auth.toJS());

    if (transitionTo) {
      router.transitionTo(transitionTo);
    }
  }
});

module.exports = AuthStore;
