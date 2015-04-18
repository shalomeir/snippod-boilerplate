'use strict';

var Reflux = require('reflux'),
    Immutable = require('immutable'),
    pageDefaults = require('../constants/defaults').page,
    pageActions = require('../actions/pageActions');


var PageStore = Reflux.createStore({

  listenables: pageActions,

  init: function() {
    this.page = Immutable.Map(pageDefaults);
  },

  getPage: function() {
    return this.page.toObject();
  },

  /* Listen PageActions
   ===============================*/
  setReturnpage: function(transition) {
    this.page = this.page.update('returnpage',transition);
  }

});

module.exports = PageStore;
