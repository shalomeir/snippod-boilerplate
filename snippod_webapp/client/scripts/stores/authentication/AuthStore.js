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
    return this.auth.toObject();
  },


  /* Listen AuthAccountActions
   ===============================*/
  onLoginCompleted: function(resData) {
    this.auth = this.auth.set('loggedIn', true);
    this.trigger(this.auth.toObject());
  },

  onLoginFailed: function(resData) {
    this.auth = this.auth.set('loggedIn', false);
  },

  onPreLoginCompleted: function(resData) {
    this.auth = this.auth.set('loggedIn', true);
    this.trigger(this.auth.toObject());
  },

  onPreLoginFailed: function(resData) {
    this.auth = this.auth.set('loggedIn', false);
  },

  onRegisterCompleted: function(resData) {
    this.auth = this.auth.set('loggedIn', true);
    this.trigger(this.auth.toObject());
  },

  setAuth: function(authData, transitionTo) {
    this.auth = this.auth.merge(Im.Map(authData));
    this.trigger(this.auth.toObject());

    if (transitionTo) {
      router.transitionTo(transitionTo);
    }
  }
});

module.exports = AuthStore;
