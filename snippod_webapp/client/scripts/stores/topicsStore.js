///**
// * Created by shalomeir on 15. 3. 16..
// */
//'use strict';
//
//var Reflux = require('reflux'),
//    topicDefaults = require('../constants/defaults').topic,
//    topicActions = require('../actions/topicActions');
//
//var UserStore = Reflux.createStore({
//
//  listenables: userActions,
//
//  init: function() {
//    this.user = userDefaults;
//  },
//
//  getUser: function() {
//    return this.user;
//  },
//
//  /* Listen UserActions
//   ===============================*/
//  setUser: function(userData) {
//    this.user = userData;
//    this.trigger(this.user);
//  }
//
//});
//
//module.exports = UserStore;
