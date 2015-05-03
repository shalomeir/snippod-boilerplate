'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    accountDefault = require('../../constants/defaults').account,
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions');

var AccountStore = Reflux.createStore({

  listenables: AuthAccountActions,

  init: function() {
    this.account = Im.Map(accountDefault);
  },

  getAccount: function() {
    return this.account.toJS();
  },

  /* Listen AuthAccountActions
   ===============================*/
  _mergeAccountData: function(resData) {
    this.account = this.account.merge(Im.Map(resData));
    this.trigger();
  },

  onLoginCompleted: function(response) {
    this.account = this.account.merge(Im.Map(response.body.account));
    this.trigger();
  },

  onPreLoginCompleted: function(response) {
    this.account = this.account.merge(Im.Map(response.body.account));
    this.trigger();
  },

  onRegisterCompleted: function(response) {
    this.onLoginCompleted(response);
  },

  onUpdateSettingsCompleted: function(response) {
    this._mergeAccountData(response.body);
  },

  setAccount: function(accountData, callback) {
    this.account = this.account.merge(Im.Map(accountData));
    this.trigger();
    if(typeof callback !== 'undefined') { callback(); }
  }
});

module.exports = AccountStore;
