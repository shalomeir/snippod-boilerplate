'use strict';

import history from '../../utils/History.js'

var Reflux = require('reflux'),
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions'),
    AuthStore = require('./AuthStore'),
    AccountStore = require('./AccountStore');


var AuthStoreJoinTrailer = Reflux.createStore({

  init: function() {
    this.joinTrailing(AuthAccountActions.register.completed, AuthStore, AccountStore,
                      this.redirectTo);
  },

  redirectTo: function(){
    history.pushState('/settings')
  }

});


module.exports = AuthStoreJoinTrailer;