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

  appendKeyValueToForm: function(form, key, value) {
    var virtualEl = document.createElement('input');
    virtualEl.setAttribute('type','hidden');
    virtualEl.setAttribute('name',key);
    virtualEl.setAttribute('value',value);
    form.appendChild(virtualEl);
    return this;
  },

  searchToObject: function(query) {
    if(!query) {
      return null;
    }
    var pairs = query.substring(1).split('&'),
      obj = {},
      pair,
      i;

    for ( i in pairs ) {
      if (pairs.hasOwnProperty(i)){
        if (pairs[i] === '') { continue; }
        pair = pairs[i].split('=');
        obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
      }
    }
    return obj;
  }
};


module.exports = StringControl;
