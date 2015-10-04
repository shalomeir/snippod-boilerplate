/**
 *   Topic Component Description
 */

'use strict';

var React = require('react'),
    { PropTypes } = React,
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),
    Authentication = require('../../utils/Authentication') ;

var Account = React.createClass({

  mixins:[PureRenderMixin, Authentication],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  //getInitialState: function() {
  //  return getState();
  //},

  render: function() {
    var account = this.props.account;

    return (
      /* jshint ignore:start */
      <DocumentTitle title='User'>
        <div className="main-container">
          <h1>Hello, {account.username}.</h1>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  }

});

module.exports = Account;
