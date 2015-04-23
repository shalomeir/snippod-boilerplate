/**
 *   Topic Component Description
 */

'use strict';

var React = require('react'),
    DocumentTitle = require('react-document-title'),
    UIActions = require('../../actions/commons/UIActions');


var Empty = React.createClass({

  componentDidMount: function() {
    var pathString = this.props.path.toLowerCase().trim();
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
