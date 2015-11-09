import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'ducks/authentication/auth';
import App from 'layout/App';
import {
    NotFound,
    Topic,
  } from 'containers';

export default (store) => {

  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { account }} = store.getState();
      if (!account) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Topic}/>
      { /*<IndexRoute component={Home}/>*/ }

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="profile" component={Topic}/>
      </Route>

      { /* Routes */ }
      <Route path="login" component={Topic} />
      <Route path="register" component={Topic} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
