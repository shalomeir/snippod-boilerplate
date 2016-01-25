import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'ducks/authentication/auth';
import App from 'layout/App';
import {
  NotFound,
  Login,
  Topic
} from 'containers';

import { isFuncWork } from 'utils/validation';

export default (store) => {

  const requireLogin = (nextState, replaceState, cb) => {
    // FIXME: This line is temporary fixed version for this issues: https://github.com/erikras/react-redux-universal-hot-example/issues/430
    const storeData = isFuncWork(store.getState) ? store.getState() : window.__data;

    function checkAuth() {
      const { auth } = storeData;
      if (!auth.loggedIn) {
        // oops, not logged in, so can't be here!
        replaceState({
          nextPathname: nextState.location.pathname
        }, '/login');
      }
      cb();
    }
    if (!isAuthLoaded(storeData)) {
      if (isFuncWork(store.dispatch)) {
        store.dispatch(loadAuth()).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      checkAuth();
    }
  };

  //const testReplaceHash = (nextState, replaceState, cb) => {
  //  console.log('dadsaa s');
  //  replaceState({dd: '후와'}, '/login?he=112q#hass?dd=ff&ad=22');
  //  cb();
  //};

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
        <Route path="profile" component={NotFound}/>
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login} />

      <Route onEnter={requireLogin}>
        <Route path="register" component={Topic}/>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
