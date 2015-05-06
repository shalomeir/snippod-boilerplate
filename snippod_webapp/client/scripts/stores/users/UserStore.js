'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    { isInBag } = require('../utils/StoreUtils'),
    UsersActions = require('../../actions/users/UsersActions');

var UserStore = Reflux.createStore({

  listenables: UsersActions,

  init: function() {
    this._user = Im.Map({});
  },

  get: function(id) {
    return this._user.get(id);
  },

  contains(id, fields) {
    return isInBag(this._user, id, fields);
  },

  /* Listen AuthAccountActions
   ===============================*/
  set: function(user) {
    this._user = this._user.set(user.id, user);
  },

  onGetUserCompleted: function(response) {
    this.set(response.body);
    this.trigger();
  },

  clearUserStore: function(callback) {
    this.init();
    if(typeof callback !== 'undefined') { callback(); }
  }

});

module.exports = UserStore;
