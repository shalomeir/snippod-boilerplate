'use strict';
var AuthStore = require('../stores/authentication/AuthStore'),
    UIActions = require('../actions/commons/UIActions'),
    PageActions = require('../actions/commons/PageActions');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {

      if (!AuthStore.getAuth().loggedIn) {
        PageActions.setPage(transition);
        UIActions.showOverlay('login');
        transition.redirect('/login');
      }
    }
  }
};


module.exports = Authentication;
