'use strict';

var Reflux = require('reflux'),
    router = require('../router'),
    userDefaults = require('../constants/defaults').user,
    userActions = require('../actions/userActions');

var UserStore = Reflux.createStore({

  listenables: userActions,

  init: function() {
    this.user = userDefaults;
  },

  getUser: function() {
    return this.user;
  },

  /* Listen UserActions
   ===============================*/
  setUser: function(userData, transitionTo) {
    this.user = userData;
    this.trigger(this.user);
    if (transitionTo) {
      router.transitionTo(transitionTo);
    }
  }
});

module.exports = UserStore;
