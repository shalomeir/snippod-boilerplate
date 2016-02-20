import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { browserHistory as history } from 'react-router';

import { isLoaded as isAuthLoaded, load as loadAuth } from 'ducks/authentication/auth';
import App from 'layout/App';
import {
  NotFound,
  Ground,
  Home,
  SinglePost,
  User,
  Setting
} from 'containers';

export default (store) => {

  const requireLogin = (nextState, replace) => {

    function checkAuth() {
      const { auth, routing: { location } } = store.getState();
      if (!auth.loggedIn) {
        // oops, not logged in, so can't be here!
        history.push({
          state: { nextPathname: location.pathname },
          pathname: '/login',
          query: Object.assign(location.query, { redirect: location.pathname })
        });
      }
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Routes
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      <Route path="/post/:postId" component={SinglePost} />
      <Route path="/user/:userId" component={User} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="/setting" component={Setting}/>
      </Route>

      { /* Routes */ }
      <Route path="/login" component={Ground} />
      <Route path="/register" component={Ground}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
