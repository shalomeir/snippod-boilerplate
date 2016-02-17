import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'ducks/authentication/auth';
import App from 'layout/App';
import {
  NotFound,
  Loading,
  Ground,
  Home,
  SinglePost,
  User,
  Setting
} from 'containers';

import { isFuncWork } from 'utils/validation';

export default (store) => {

  const requireLogin = (nextState, replaceState, cb) => {
    // FIXME: This line is temporary fixed version for this issues: https://github.com/erikras/react-redux-universal-hot-example/issues/430
    const storeData = isFuncWork(store.getState) ? store.getState() : window.__data;
    const { auth } = storeData;

    function checkAuth() {
      if (!auth.loggedIn) {
        // oops, not logged in, so can't be here!
        replaceState({
          nextPathname: nextState.location.pathname,
        }, '/login');
      }
      cb();
    }
    function preLoad(action = null) {
      if (!auth.loggedIn) {
        // oops, not logged in, so can't be here!
        replaceState({
          nextPathname: nextState.location.pathname,
          action
        }, '/prelogin');
      }
      cb();
    }
    if (!isAuthLoaded(storeData)) {
      if (isFuncWork(store.dispatch)) {
        store.dispatch(loadAuth()).then(checkAuth);
      } else {
        preLoad(loadAuth);
      }
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
      <Route path="/prelogin" component={Loading} />
      <Route path="/login" component={Ground} />
      <Route path="/register" component={Ground}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
