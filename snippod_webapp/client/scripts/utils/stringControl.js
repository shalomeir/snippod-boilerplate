/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

//var jQuery = require('jquery');

var stringControl = {

  getParameterByName : function(string, key) {
    key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)'),
      results = regex.exec(string);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

};


module.exports = stringControl;
