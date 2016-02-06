/*eslint-disable max-len,quotes*/
const cookie = require('cookie');
    //jQuery = require('jquery');

const TokenControl = {

  getToken: function() {
    const cookies = cookie.parse(document.cookie);
    return cookies.token;
  },

  setToken: function(token, duration) {
    const today = new Date();
    // Set expire date for cookie for some time into the future (days)
    const endDate = new Date(today.getTime() + (duration * 1000 * 60 * 60 * 24));
    document.cookie = cookie.serialize('token', token, {expires: endDate});
  },

  // using jQuery
  //getCookie: function(name) {
  //  var cookieValue = null;
  //  if (document.cookie && document.cookie !== '') {
  //    var cookies = document.cookie.split(';');
  //    for (var i = 0; i < cookies.length; i++) {
  //      var cookie = jQuery.trim(cookies[i]);
  //      // Does this cookie string begin with the name we want?
  //      if (cookie.substring(0, name.length + 1) === (name + '=')) {
  //        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //        break;
  //      }
  //    }
  //  }
  //  return cookieValue;
  //}

};


module.exports = TokenControl;
