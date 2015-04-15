'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    DocumentTitle = require('react-document-title'),
    userActions = require('../../actions/userActions'),
    Authentication = require('../../utils/authentication') ;


var Settings = React.createClass({

  mixins: [Authentication],

  render: function() {
    var user = this.props.user;

    return (
      /* jshint ignore:start */
      <DocumentTitle title='Settings page'>
        <div className="settings content full-width">

          <h3>Profile Information</h3>

          <form id="profile-form" action="/auth/profile?_method=PUT" method="post" onSubmit={this.handleSettings}>

            <p>
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" defaultValue={user.email} />
            </p>

            <p>
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" defaultValue={user.username} />
            </p>

            <p>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" name="firstName" id="firstName" defaultValue={user.firstName} />
            </p>

            <p>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" name="lastName" id="lastName" defaultValue={user.lastName} />
            </p>

            <button>Update Profile</button>
          </form>

          <h3>Change Password</h3>

          <form id="password-form" action="/auth/password_change?_method=PUT" method="post" onSubmit={this.handlePassword}>

            <p>
              <label htmlFor="password">New Password:</label>
              <input type="password" name="password" id="password" defaultValue='' />
            </p>

            <p>
              <label htmlFor="confirm_password">Confirm Password:</label>
              <input type="password" name="confirm_password" id="confirm_password" defaultValue='' />
            </p>

            <button>Change Password</button>
          </form>

          <h3>Delete Account</h3>

          <p>You can delete your account, but keep in mind this action is irreversible.</p>

          <form id="delete-form" action="/auth/delete?_method=DELETE" method="post" onSubmit={this.handleDestroy}>
            <button>Delete my account</button>
          </form>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  },

  handleSettings: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.updateSettings(form);
  },

  handlePassword: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.updatePassword(form);
  },

  handleDestroy: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    userActions.destroy(form);
  }

});

module.exports = Settings;
