'use strict';

var Reflux = require('reflux'),
    router = require('../../router'),
    Im = require('immutable'),
    accountDefault = require('../../constants/defaults').account,
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions');

var AccountStore = Reflux.createStore({

  listenables: AuthAccountActions,

  init: function() {
    this.account = Im.Map(accountDefault);
  },

  getAccount: function() {
    return this.account.toObject();
  },

  /* Listen AuthAccountActions
   ===============================*/
  _mergeAccountData: function(resData) {
    this.account = this.account.merge(Im.Map(resData));
    this.trigger(this.account.toObject());
  },

  onLoginCompleted: function(resData) {
    this.account = this.account.merge(Im.Map(resData.account));
    this.trigger(this.account.toObject());
  },

  onPreLoginCompleted: function(resData) {
    this.account = this.account.merge(Im.Map(resData.account));
    this.trigger(this.account.toObject());
  },

  onRegisterCompleted: function(resData) {
    this.onLoginCompleted(resData);
  },

  onUpdateSettingsCompleted: function(resData) {
    this._mergeAccountData(resData);
  },

  setAccount: function(accountData) {
    this.account = this.account.merge(Im.Map(accountData));
    this.trigger(this.account.toObject());
  }
});

module.exports = AccountStore;
