
/**
 * Module `exports`
 */

module.exports = function (superagent) {
  var Request = superagent.Request;
  Request.prototype.csrf = csrf;
  return superagent;
};

/**
 * Adds the CSRF token to the request headers
 *
 * @param {String} token
 */

function csrf (token) {
  if (!token) token = window._csrf;
  this.set('X-CSRF-Token', token);
  return this;
}