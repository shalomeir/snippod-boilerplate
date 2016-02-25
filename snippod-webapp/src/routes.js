import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { browserHistory as history } from 'react-router';

import { isLoaded as isAuthLoaded, load as loadAuth } from 'ducks/authentication/auth';
import { replaceLocation, switchLangIfDiffrent } from 'ducks/application/application';
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

    const checkAuth = () => {
      const { auth, routing: { location }, application: { reloadedNum, lang } } = store.getState();
      // oops, not logged in, so can't be here!
      if (!auth.loggedIn) {

        // Key reloadedNum is used for issue that Router reload page for logout. https://github.com/reactjs/react-router/issues/1982
        if (reloadedNum === 0) {
          store.dispatch(replaceLocation({
            state: { nextPathname: location.pathname },
            pathname: '/login',
            query: Object.assign(location.query, { redirect: location.pathname })
          }));
        } else {
          replace({
            state: { nextPathname: location.pathname },
            pathname: '/login',
            query: Object.assign(location.query, { redirect: location.pathname })
          });
        }
      }
    };

    //FixMe: Call twice if connect a requireLogin page directly.
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
