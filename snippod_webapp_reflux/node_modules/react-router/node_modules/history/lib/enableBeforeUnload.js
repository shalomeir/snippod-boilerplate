'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _useBeforeUnload = require('./useBeforeUnload');

var _useBeforeUnload2 = _interopRequireDefault(_useBeforeUnload);

function enableBeforeUnload() {
  _warning2['default'](false, 'enableBeforeUnload is deprecated, use useBeforeUnload instead');

  return _useBeforeUnload2['default'].apply(this, arguments);
}

exports['default'] = enableBeforeUnload;
module.exports = exports['default'];