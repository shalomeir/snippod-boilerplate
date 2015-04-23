/**
 * Created by shalomeir on 15. 3. 16..
 */
'use strict';

var $ = require('jquery'),
  router = require('../router'),
  { getParameterByName } = require('./StringControl'),
  Cookies = require('cookies-js'),
  request = require('superagent'),
  csrf = require('superagent-csrf'),
  apiPath = require('../constants/defaults').apiPath;
  //var prefix = require('superagent-prefix')(apiPath);

require('./serialization');


var RESTCall = {

  //This function should be called in Async Action
  //  which have options.asyncResult = true.
  //Beacuse this call action.completed() or action.failed()
  postForm: function(form, callback) {

    return new Promise((resolve, reject) => {

      var postData = JSON.stringify($(form).serializeObject());
      var postUrl = form.getAttribute('action') || window.location.pathname;
      var method = getParameterByName(postUrl, '_method') || 'POST';
      postUrl = apiPath + postUrl;
      var csrftoken = Cookies.get('csrftoken');

      request
        .post(postUrl)
        .type('json')
        .accept('json')
        .set({
          //'authorization': 'Bearer ' + token,
          'X-CSRFToken': csrftoken,
          'X-Requested-With': 'XMLHttpRequest',
          'X-HTTP-Method-Override': method
        })
        .send(postData)
        .end(function(response) {
          if (response.ok) {
            resolve(response);

            if (callback && callback.success) {
              callback.success(response);
            }
          }
          else {
            reject(response);

            if (callback && callback.error) {
              callback.error(response);
            }

          }

          if (callback && callback.complete) {
            callback.complete(response);
          }
        });

    });

  },

  postObject: function(object, postUrl, callback) {

    return new Promise((resolve, reject) => {

      var postData = object;
      var postUrl = postUrl || window.location.pathname;
      var method = getParameterByName(postUrl, '_method') || 'POST';
      postUrl = apiPath + postUrl;
      var csrftoken = Cookies.get('csrftoken');

      request
        .post(postUrl)
        .type('json')
        .accept('json')
        .set({
          //'authorization': 'Bearer ' + token,
          'X-CSRFToken': csrftoken,
          'X-Requested-With': 'XMLHttpRequest',
          'X-HTTP-Method-Override': method
        })
        .send(postData)
        .end(function(response) {
          if (response.ok) {
            resolve(response);

            if (callback && callback.success) {
              callback.success(response);
            }
          }
          else {
            reject(response);

            if (callback && callback.error) {
              callback.error(response);
            }

          }

          if (callback && callback.complete) {
            callback.complete(response);
          }
        });

    });

  }

};


module.exports = RESTCall;
