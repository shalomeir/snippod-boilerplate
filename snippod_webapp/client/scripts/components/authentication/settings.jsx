'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),
    $ = require('jquery'),
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions'),
    ComponentMessageStore = require('../../stores/subs/ComponentMessageStore'),
    Authentication = require('../../utils/Authentication') ;


var Settings = React.createClass({

  mixins: [
    Authentication,
    Reflux.listenTo(ComponentMessageStore, 'onErrorMessage')
  ],

  getInitialState: function() {
    return {
      errors: '',
      errorMessage: '',
      submitted: false
    };
  },

  onErrorMessage: function(errorMessages) {
    var errorSentence;
    if (typeof errorMessages.message !== 'undefined') {
      errorSentence = errorMessages.message;
    } else {
      errorSentence = null;
    }
    this.setState({
      errors: errorMessages.errors,
      errorMessage: errorSentence,
      submitted: false
    });
  },

  render: function() {
    var account = this.props.account;
    var profileActionUrl = '/accounts/'+account.id+'/?_method=PATCH',
        passwordSetActionUrl = '/accounts/'+account.id+'/set_password/?_method=PATCH',
        deleteAccountActionUrl = '/accounts/'+account.id+'/?_method=DELETE';

    return (
      /* jshint ignore:start */
      <DocumentTitle title='Settings page'>
        <div className="settings content full-width">

          <h3>Profile Information</h3>

          <form id="profile-form" action={profileActionUrl} method="post" onSubmit={this.handleSettings}>

            <p>
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" defaultValue={account.email} />
            </p>

            <p>
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" defaultValue={account.username} />
            </p>

            <p>
              <label htmlFor="firstName">First Name:</label>
              <input type="text" name="firstName" id="firstName" defaultValue={account.firstName} />
            </p>

            <p>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" name="lastName" id="lastName" defaultValue={account.lastName} />
            </p>

            <button>Update Profile</button>
          </form>

          <h3>Change Password</h3>

          <form id="password-form" action={passwordSetActionUrl} method="post" onSubmit={this.handlePassword}>

            <p>
              <label htmlFor="password">New Password:</label>
              <input type="password" name="password" id="password" defaultValue='' />
            </p>

            <p>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" name="confirmPassword" id="confirmPassword" defaultValue='' />
            </p>

            <button>Change Password</button>
          </form>

          <h3>Delete Account</h3>

          <p>You can delete your account, but keep in mind this action is irreversible.</p>

          <form id="delete-form" action={deleteAccountActionUrl} method="post" onSubmit={this.handleDestroy}>
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

    AuthAccountActions.updateSettings(form);
  },

  handlePassword: function(e) {
    e.preventDefault();
    var form = e.currentTarget;

    AuthAccountActions.updatePassword(form);
  },

  handleDestroy: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    AuthAccountActions.destroy(form);
  }

});

module.exports = Settings;
