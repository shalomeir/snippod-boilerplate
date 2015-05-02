'use strict';

var React = require('react'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions'),
    Router = require('react-router'),
    { Link } = Router;


var Forgot = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='Forgot?'>
        <div className="forgot">
          <h3>Forgot Password</h3>
          <form method="post" action="/forgot" onSubmit={this.handleSubmit}>
            <p>Enter your email address below and we will send you password reset instructions.</p>

            <p>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" placeholder="Enter your email" autofocus="autofocus" />
            </p>

            <button>Reset Password</button>
          </form>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    AuthAccountActions.forgot(form);
  }
});

module.exports = Forgot;
