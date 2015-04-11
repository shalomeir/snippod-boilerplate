/**
 *   Topic Component Description
 */

'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title');


var User = React.createClass({

  //getInitialState: function() {
  //  return getState();
  //},

  render: function() {
    var user = this.props.user;

    return (
      /* jshint ignore:start */
      <DocumentTitle title='User'>
        <div className="main-container">
          <h1>Hello, {user.firstName ? user.firstName : user.email}.</h1>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  }

});

module.exports = User;
