'use strict';

var Reflux = require('reflux'),
    serialize = require('form-serialize'),
    $ = require('jquery'),
    //cookie = require('cookie'),
    router = require('../router'),
    //{ getToken, setToken, getCookie } = require('../utils/tokenControl'),
    { getParameterByName } = require('../utils/stringControl'),
    Cookies = require('cookies-js'),
    userDefaults = require('../constants/defaults').user,
    apiPath = require('../constants/defaults').apiPath,
    request = require('superagent'),
    csrf = require('superagent-csrf');
//var prefix = require('superagent-prefix')(apiPath);

require('../utils/serialization');

var messagesActions = require('./messagesActions');

var userActions = Reflux.createActions({
  //from component
  'login':{},
  'logout':{},
  'register':{},
  'forgot':{},
  'reset':{},
  'updateSettings':{},
  'updatePassword':{},
  'destroy':{},

  //from action to store
  'setUser':{}
});


/* Auth Method
 ===============================*/
var _postForm = function(form, callback){

  var postData = JSON.stringify($(form).serializeObject());
  var postUrl = form.getAttribute('action') || window.location.pathname;
  var method = getParameterByName(postUrl, '_method') || 'POST';
  postUrl = apiPath + postUrl;
  //var token = getToken();
  var csrftoken = Cookies.get('csrftoken');
  var options = callback.options || {};
  //var to = csrf(request);
  //token = window._csrf;

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
    .end(function(res) {
      if (res.ok) {
        var userData = userDefaults;
        // If auth token needs to be stored
        //if (options.setToken) {
        //  // Store token in cookie that expires in a week
        //  setToken(res.body.token, 7);
        //}
        // If user needs to be updated
        if (options.updateUser) {
          userData = res.body.user;
          userData.loggedIn = true;
          if (options.successUrl) {
            userActions.setUser(userData,options.successUrl);
          }
          userActions.setUser(userData);
        }
        // If user needs to be destroyed
        if (options.destroyUser) {
          // Log user out
          userActions.logout();
        }
        if (callback && callback.success) {
          callback.success(res);
        }

        messagesActions.setMessages(res.body);
        messagesActions.setError({});
      }
      else {
        if (callback && callback.error) {
          callback.error(res);
        }
        if (options.errorUrl) {
          router.transitionTo(options.errorUrl);
        }
        messagesActions.setError(res.body);
      }

      if (callback && callback.complete) {
        callback.complete(res);
      }
    });

};


/* User Actions
 ===============================*/
userActions.login.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    //setToken: true,
    updateUser: true
  };
  _postForm(form, cb);

});

userActions.logout.listen(function() {
  // Remove token
  //setToken('', -1);
  var cb = function() {};
  cb.options = {};
  var form = document.createElement('form');
  form.setAttribute('action', '/auth/logout/');
  _postForm(form, cb);

  // Reset user to defaults
  userActions.setUser(userDefaults);

  // Delete Cookies
  Cookies.expire('csrftoken');
  Cookies.expire('sessionid');

  // Redirect to homepage
  router.transitionTo('/');
});

userActions.register.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/settings',
    updateUser: true
  };
  _postForm(form, cb);
});

userActions.forgot.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/',
    errorUrl: '/login/forgot'
  };
  _postForm(form, cb);
});

userActions.reset.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/',
    errorUrl: window.location.pathname
  };
  _postForm(form, cb);
});

// from setting component
userActions.updateSettings.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/settings',
    errorUrl: '/settings',
    updateUser: true
  };
  _postForm(form, cb);
});

userActions.updatePassword.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    successUrl: '/settings',
    errorUrl: '/settings'
  };
  _postForm(form, cb);
});

userActions.destroy.listen(function(form, callback) {
  var cb = callback || function() {};
  cb.options = {
    destroyUser: true
  };
  _postForm(form, cb);
});


module.exports = userActions;
