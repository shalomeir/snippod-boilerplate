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
    this.trigger(this.account.toJS());
  },

  onLoginCompleted: function(resData) {
    this.account = this.account.merge(Im.Map(resData.account));
    this.trigger(this.account.toJS());
  },

  onPreLoginCompleted: function(resData) {
    this.account = this.account.merge(Im.Map(resData.account));
    this.trigger(this.account.toJS());
  },

  onRegisterCompleted: function(resData) {
    this.onLoginCompleted(resData);
  },

  onUpdateSettingsCompleted: function(resData) {
    this._mergeAccountData(resData);
  },

  setAccount: function(accountData) {
    this.account = this.account.merge(Im.Map(accountData));
    this.trigger(this.account.toJS());
  }
});

module.exports = AccountStore;
