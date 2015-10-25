'use strict';
var AuthStore = require('../stores/authentication/AuthStore'),
    UIActions = require('../actions/commons/UIActions'),
    PageActions = require('../actions/commons/PageActions');

function requireAuth(nextState, replaceState) {
  if (!AuthStore.getAuth().loggedIn) {
    PageActions.setPage(nextState.location);
    UIActions.showOverlay('login');
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
}

module.exports = requireAuth;
