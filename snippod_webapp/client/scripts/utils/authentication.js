'use strict';
var userStore = require('../stores/userStore'),
    pageActions = require('../actions/pageActions');

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {

      if (!userStore.getUser().loggedIn) {
        pageActions.setReturnpage(transition);
        transition.redirect('/login');
      }
    }
  }
};



module.exports = Authentication;
