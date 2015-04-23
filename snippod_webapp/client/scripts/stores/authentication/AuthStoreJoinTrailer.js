'use strict';

var Reflux = require('reflux'),
    router = require('../../router'),
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions'),
    AuthStore = require('./AuthStore'),
    AccountStore = require('./AccountStore');


var AuthStoreJoinTrailer = Reflux.createStore({

  init: function() {
    this.joinTrailing(AuthAccountActions.register.completed, AuthStore, AccountStore,
                      this.redirectTo);
  },

  redirectTo: function(){
    router.transitionTo('/settings');
  }

});


module.exports = AuthStoreJoinTrailer;