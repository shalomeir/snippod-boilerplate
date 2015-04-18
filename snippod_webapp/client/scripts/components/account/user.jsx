/**
 *   Topic Component Description
 */

'use strict';

var React = require('react'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title');


var User = React.createClass({

  mixins:[PureRenderMixin],

  //getInitialState: function() {
  //  return getState();
  //},

  render: function() {
    var user = this.props.user;

    return (
      /* jshint ignore:start */
      <DocumentTitle title='User'>
        <div className="main-container">
          <h1>Hello, {user.username}.</h1>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  }

});

module.exports = User;
