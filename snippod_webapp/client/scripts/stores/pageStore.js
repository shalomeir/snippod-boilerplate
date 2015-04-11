'use strict';

var Reflux = require('reflux'),
    pageDefaults = require('../constants/defaults').page,
    pageActions = require('../actions/pageActions');


var PageStore = Reflux.createStore({

  listenables: pageActions,

  init: function() {
    this.page = pageDefaults;
  },

  getPage: function() {
    return this.page;
  },

  /* Listen PageActions
   ===============================*/
  setReturnpage: function(transition) {
    this.page.returnpage = transition;
  }

});

module.exports = PageStore;
