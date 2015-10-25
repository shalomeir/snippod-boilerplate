'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = require('./RouteUtils');

var _PropTypes = require('./PropTypes');

var _React$PropTypes = _react2['default'].PropTypes;
var string = _React$PropTypes.string;
var bool = _React$PropTypes.bool;
var func = _React$PropTypes.func;

/**
 * A <Route> is used to declare which components are rendered to the page when
 * the URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is requested,
 * the tree is searched depth-first to find a route whose path matches the URL.
 * When one is found, all routes in the tree that lead to it are considered
 * "active" and their components are rendered into the DOM, nested in the same
 * order as they are in the tree.
 */
var Route = _react2['default'].createClass({
  displayName: 'Route',

  statics: {

    createRouteFromReactElement: function createRouteFromReactElement(element) {
      var route = _RouteUtils.createRouteFromReactElement(element);

      if (route.handler) {
        _warning2['default'](false, '<Route handler> is deprecated, use <Route component> instead');

        route.component = route.handler;
        delete route.handler;
      }

      return route;
    }

  },

  propTypes: {
    path: string,
    ignoreScrollBehavior: bool,
    handler: // deprecated
    _PropTypes.component, component: _PropTypes.component,
    components: _PropTypes.components,
    getComponents: func
  },

  render: function render() {
    _invariant2['default'](false, '<Route> elements are for router configuration only and should not be rendered');
  }

});

exports['default'] = Route;
module.exports = exports['default'];