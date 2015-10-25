'use strict';

exports.__esModule = true;
exports.stringifyQuery = stringifyQuery;
exports.parseQueryString = parseQueryString;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function stringifyQuery(query) {
  return _qs2['default'].stringify(query, { arrayFormat: 'brackets' });
}

function parseQueryString(queryString) {
  return _qs2['default'].parse(queryString);
}