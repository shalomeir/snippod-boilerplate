'use strict';
var AuthStore = require('../stores/authentication/AuthStore'),
    PageActions = require('../actions/commons/PageActions');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {

      if (!AuthStore.getAuth().loggedIn) {
        PageActions.setPage(transition);
        transition.redirect('/login');
      }
    }
  }
};


module.exports = Authentication;
