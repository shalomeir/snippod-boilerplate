'use strict';

var Reflux = require('reflux'),
    router = require('../../router'),
    pageDefaults = require('../../constants/defaults').page,
    pageActions = require('../../actions/commons/PageActions');


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
  setPage: function(transition) {
    this.page.transition = transition;
    this.page.returnpage = transition.path;
    this.trigger();
  },

  setReturnpage: function(path) {
    this.page.returnpage = path;
  },

  transitionToReturnpage: function() {
    if(this.page.returnpage) {
      router.transitionTo(this.page.returnpage);
      this.page.returnpage = null;
    }
  }

});

module.exports = PageStore;
