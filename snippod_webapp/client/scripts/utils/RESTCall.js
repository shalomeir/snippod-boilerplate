/**
 * Created by shalomeir on 15. 3. 16..
 */
'use strict';

var $ = require('jquery'),
    { getParameterByName, checkAbsoluteURL } = require('./StringControl'),
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
  requestPostForm: function(form, callback) {

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
        .end(function(error, response) {
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

  requestPost: function(requestUrl, object, callback) {

    return new Promise((resolve, reject) => {

      var postData = object;
      var postUrl = requestUrl || window.location.pathname;
      var method = getParameterByName(postUrl, '_method') || 'POST';
      if(!checkAbsoluteURL(postUrl)){
        postUrl = apiPath + postUrl;
      }
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
        .end(function(error, response) {
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

  requestGet: function(requestUrl, query, callback) {

    return new Promise((resolve, reject) => {

      if(!checkAbsoluteURL(requestUrl)){
        requestUrl = apiPath + requestUrl;
      }
      var csrftoken = Cookies.get('csrftoken');

      request
        .get(requestUrl)
        .type('json')
        .accept('json')
        .query(query)
        .set({
          //'authorization': 'Bearer ' + token,
          'X-CSRFToken': csrftoken,
          'X-Requested-With': 'XMLHttpRequest',
        })
        .end(function(error, response ) {
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
