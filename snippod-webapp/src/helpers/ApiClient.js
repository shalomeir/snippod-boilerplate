import superagent from 'superagent';
import config from '../config';
import { apiPath, apiPort } from '../constants/defaults';
import Cookies from 'cookies-js';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://localhost:' + config.apiPort + apiPath + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return 'http://' + location.hostname + ':' + apiPort + apiPath + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        request.withCredentials();

        if (params) {
          request.query(params);
        }
        request.set({
          'accept': 'application/json',
          'Content-Type': 'application/json',
          //'X-Requested-With': 'XMLHttpRequest',
          //'X-HTTP-Method-Override': method
        });

        let csrftoken = null;
        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
          // TODO : csrf token get for Server-side Redndering
          // It's not working. Also couldn't call api server in SERVER Environment.
          csrftoken = req.get('cookie').get('csrftoken');
        }
        if (__CLIENT__) {
          csrftoken = Cookies.get('csrftoken');
        }

        if (csrftoken) {
          request.set({
            'X-CSRFToken': csrftoken,
          });
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
