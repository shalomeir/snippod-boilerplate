/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var cookie = require('cookie');

var tokenControl = {

  getToken: function() {
    var cookies = cookie.parse(document.cookie);
    return cookies.token;
  },

  setToken: function(token, duration) {
    var today = new Date();
    // Set expire date for cookie for some time into the future (days)
    var endDate = new Date(today.getTime() + (duration * 1000 * 60 * 60 * 24));
    document.cookie = cookie.serialize('token', token, {expires: endDate});
  }

};


module.exports = tokenControl;
