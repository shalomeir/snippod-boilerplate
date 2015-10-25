'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _useQueries = require('./useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

function enableQueries() {
  _warning2['default'](false, 'enableQueries is deprecated, use useQueries instead');

  return _useQueries2['default'].apply(this, arguments);
}

exports['default'] = enableQueries;
module.exports = exports['default'];