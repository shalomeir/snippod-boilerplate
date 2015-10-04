/**
 *   Topic Component Description
 */

'use strict';

var React = require('react'),
    { PropTypes } = React,
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),
    PageActions = require('../../actions/commons/PageActions'),
    UIActions = require('../../actions/commons/UIActions');


var Empty = React.createClass({

  mixins:[PureRenderMixin],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  componentDidMount: function() {
    this._checkOverlay();
  },

  componentWillUnmount: function() {
    PageActions.resetReturnpage();
  },

  _checkOverlay: function() {
    var pathString = this.props.location.pathname.toLowerCase().trim();
    if (pathString === String('/login')) {
      UIActions.showOverlay('login');
    } else if (pathString === String('/register')) {
      UIActions.showOverlay('register');
    }
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='Login Page'>
        <div className="main-container">
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  }

});

module.exports = Empty;
