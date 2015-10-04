'use strict';
import history from '../../utils/History.js'

var Reflux = require('reflux'),
    { searchToObject } = require('../../utils/StringControl'),
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
  setPage: function(transition, callback) {
    this.page.transition = transition;
    this.page.returnpage = transition.path;
    this.trigger();
    if(typeof callback !== 'undefined') { callback(); }
  },

  setReturnpage: function(path, query, callback) {
    if( !this.page.returnpage ) {
      this.page.returnpage = path;
      this.page.returnquery = query;
    }
    if(typeof callback !== 'undefined') { callback(); }
  },

  resetReturnpage: function(callback) {
    this.page.returnpage = null;
    this.page.returnquery = null;
    if(typeof callback !== 'undefined') { callback(); }
  },

  transitionToReturnpage: function(callback) {
    if (this.page.returnpage) {
      history.replaceState(null, this.page.returnpage, searchToObject(this.page.returnquery));
      //router.replaceWith(this.page.returnpage, null,
      //  searchToObject(this.page.returnquery));
      this.resetReturnpage();
    }
    if(typeof callback !== 'undefined') { callback(); }
  }

});

module.exports = PageStore;
