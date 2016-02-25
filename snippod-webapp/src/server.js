import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './store/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';

import createHistory from 'history/lib/createMemoryHistory';
//import { reduxReactRouter, match } from 'redux-router/server';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import * as i18n from './i18n';

import qs from 'query-string';
import getRoutes from './routes';
//import getStatusFromRoutes from './helpers/getStatusFromRoutes';
import './utils/supportIntl';

import Root from './Root';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: 'http://' + config.apiHost + ':' + config.apiPort,
  ws: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient(req);
  const history = createHistory();

  const store = createStore(history, client);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer(renderProps, store, { client }).then(() => {
        const intlData = {
          lang: store.getState().application.lang,
          messages: i18n[store.getState().application.lang]
        };

        const component = (
          <Provider store={store} key="provider">
            <IntlProvider key="intl" {...intlData}>
              <ReduxAsyncConnect {...renderProps} />
            </IntlProvider>
          </Provider>
        );

        res.status(200);

        global.navigator = { userAgent: req.headers['user-agent'] };

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  if (config.isProduction) {
    const io = new SocketIo(server);
    io.path('/api/ws');
  }

  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
