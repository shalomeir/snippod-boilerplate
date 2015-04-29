/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

//var jQuery = require('jquery');

var StringControl = {

  getParameterByName : function(string, key) {
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)'),
      results = regex.exec(string);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },

  checkAbsoluteURL : function(urlString) {
    var pat = /^https?:\/\//i;
    if (pat.test(urlString)) {
      return true;
    } else {
      return false;
    }
  }
};


module.exports = StringControl;
