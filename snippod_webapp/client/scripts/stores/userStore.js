'use strict';

var Reflux = require('reflux'),
    router = require('../router'),
    Immutable = require('immutable'),
    userDefaults = require('../constants/defaults').user,
    userActions = require('../actions/userActions');

var UserStore = Reflux.createStore({

  listenables: userActions,

  init: function() {
    this.user = Immutable.Map(userDefaults);
  },

  getUser: function() {
    return this.user.toObject();
  },

  /* Listen UserActions
   ===============================*/
  setUser: function(userData, transitionTo) {
    this.user = this.user.merge(userData);
    this.trigger(this.user.toObject());
    if (transitionTo) {
      router.transitionTo(transitionTo);
    }
  }
});

module.exports = UserStore;
