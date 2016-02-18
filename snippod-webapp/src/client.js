/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import React from 'react';
import ReactDOM from 'react-dom';
//import createHistory from 'history/lib/createBrowserHistory';
import createStore from './store/create';
import ApiClient from './helpers/ApiClient';
//import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
//import { reduxReactRouter, ReduxRouter } from 'redux-router';
import './utils/supportIntl';

const client = new ApiClient();

const dest = document.getElementById('content');

//TODO: Should be used for SSR.
//Do Not use for this time.
//import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';
//const store = createStore(reduxReactRouter, makeHooksSafe(getRoutes), createHistory, client, window.__data);
const store = createStore(browserHistory, client, window.__data);

import Root from './Root';

//FIXME: Do not use Node.js server now
//function initSocket() {
//  const socket = io('', {path: '/api/ws', transports: ['polling']});
//  socket.on('news', (data) => {
//    console.log(data);
//    socket.emit('my other event', { my: 'data from client' });
//  });
//  socket.on('msg', (data) => {
//    console.log(data);
//  });
//
//  return socket;
//}
//
//global.socket = initSocket();


ReactDOM.render(
  <Provider store={store} key="provider">
    <Root client={client} />
  </Provider>,
  dest
);


if (typeof(__DEVTOOLS__) && __DEVTOOLS__ && __CLIENT__) {
  //Render DevTools in App
  //const DevTools = require('./containers/DevTools/DevTools');
  //rootChildren.push(<DevTools key="devtools" />);

  //Open DevTools in a New Window
  const showDevTools = require('./helpers/showDevTools');
  showDevTools(store);
}


if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
