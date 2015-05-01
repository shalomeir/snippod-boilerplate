/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';
var defaultSorting = require('../constants/defaults').sortingOption.defaultSorting;

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
  },

  extractSortingFromResponse: function(response) {
    var query = response.req._query[0];
    if (typeof query === 'undefined') {
      return defaultSorting;
    } else {
      return query.split('=')[1];
    }
  },

  extractPostIdFromResponse: function(response) {
    var param = response.req.path[0];
    return param.split('=')[1];
  }

};


module.exports = StringControl;
