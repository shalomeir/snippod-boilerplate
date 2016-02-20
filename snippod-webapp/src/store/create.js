import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createMiddleware from '../middleware/clientMiddleware';
import { syncHistory } from 'react-router-redux';

//TODO: Only works in client Mode. Prepare SSR.
import { getDefaultLang } from '../helpers/getBrowserSettings.js';
const defaultLang = getDefaultLang();

export default function createStore(history, client, data) {
  const reduxRouterMiddleware = syncHistory(history);
  const middleware = [thunk, createMiddleware(client), reduxRouterMiddleware];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }


  const reducer = require('ducks/reducer');
  // TODO: It's not good way. But I coudn't find another way to fix this lang value.
  // State data is created at Server Side. So initial data which is created in server is not use a browser settings.
  if (__CLIENT__) {
    data.application.lang = defaultLang;
  }
  const store = finalCreateStore(reducer, data);

  //reduxRouterMiddleware.listenForReplays(store);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('ducks/reducer', () => {
      store.replaceReducer(require('ducks/reducer'));
    });
  }

  return store;
}
