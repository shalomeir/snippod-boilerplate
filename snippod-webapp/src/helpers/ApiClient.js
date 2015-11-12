import superagent from 'superagent';
import config from '../config';
import { apiPath, apiPort } from '../constants/defaults';
import Cookies from 'cookies-js';

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient_ {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](this.formatUrl(path));
            // To send cookies from the origin
            request.withCredentials();
            if (options && options.params) {
              request.query(options.params);
            }
            let csrftoken = null;
            if (__SERVER__) {
              if (req.get('cookie')) {
                request.set('cookie', req.get('cookie'));
                // TODO : csrf token get for Server-side Redndering
                // It's not working. Also couldn't call api server in SERVER Environment.
                csrftoken = req.get('cookie').get('csrftoken');
              }
            }
            if (__CLIENT__) {
              csrftoken = Cookies.get('csrftoken');
            }
            if (csrftoken) {
              request.set({
                //'authorization': 'Bearer ' + token,
                'X-CSRFToken': csrftoken,
                //'X-Requested-With': 'XMLHttpRequest',
                //'X-HTTP-Method-Override': method
              });
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                reject((res && res.body) || err);
              } else {
                resolve(res.body);
              }
            });
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (__SERVER__) {
      // Prepend host and port of the API server to the path.
      return 'http://localhost:' + config.apiPort + apiPath + adjustedPath;
    }

    // Prepend `/api` to relative URL, to proxy to API server.
    return 'http://' + location.hostname + ':' + apiPort + apiPath + adjustedPath;
  }
}
const ApiClient = ApiClient_;

export default ApiClient;
