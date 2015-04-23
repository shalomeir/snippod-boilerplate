/**
* Created by shalomeir on 15. 3. 16..
*/
'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    Router = require('react-router'),
    { Link } = Router,
    // components
    Spinner = require('../commons/Spinner.jsx'),
    // stores
    AuthStore = require('../../stores/authentication/AuthStore'),
    ComponentMessageStore = require('../../stores/subs/ComponentMessageStore'),
    // actions
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions');


var Register = React.createClass({

  mixins: [
    PureRenderMixin,
    Reflux.listenTo(AuthStore, 'resetForm'),
    Reflux.listenTo(ComponentMessageStore, 'onErrorMessage')
  ],

  getInitialState: function() {
    return {
      errors: '',
      errorMessage: '',
      submitted: false
    };
  },

  resetForm: function() {
    this.refs.email.getDOMNode().value = '';
    this.refs.username.getDOMNode().value = '';
    this.refs.password.getDOMNode().value = '';
    this.refs.confirmPassword.getDOMNode().value = '';
    this.refs.submit.getDOMNode().disabled = false;
    this.setState({
      submitted: false
    });
  },

  onErrorMessage: function(errorMessages) {
    this.refs.submit.getDOMNode().disabled = false;
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

  registerAccount: function(e) {
    e.preventDefault();
    var form = e.currentTarget;

    this.refs.submit.getDOMNode().disabled = true;
    this.setState({
      submitted: true
    });

    AuthAccountActions.register(form);
  },

  render: function() {

    var errorMessage = null;
    var errors = {};
    var stateErrors = this.state.errors;
    if (this.state.errorMessage) {
      errorMessage = (
        /* jshint ignore:start */
        <div className="error login-error">
          { this.state.errorMessage }
        </div>
        /* jshint ignore:end */
      );
    }
    if (stateErrors) {
      for (var key in stateErrors) {
        if(stateErrors.hasOwnProperty(key)) {
          errors[key] = (
            /* jshint ignore:start */
            <div className="error login-error">
              { stateErrors[key] }
            </div>
            /* jshint ignore:end */
          );
        }
      }
    }

    return (
      /* jshint ignore:start */
      <div className="login md-modal text-center" id="overlay-content">
        <form onSubmit={ this.registerAccount } id="signup-form" method="post" action="/accounts/register/" className="login-form text-left">
          <h1>Register</h1>
          <label htmlFor="email">Email</label><br />
          <input type="text" name="email" id="email" placeholder="Email" ref="email" />
          { errors['email'] }<br />
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" id="username" placeholder="Username" ref="username" />
          { errors['username'] }<br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" placeholder="Password" id="password" ref="password" />
          { errors['password'] }<br />
          <label htmlFor="confirmPassword">Confirm Password</label><br />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" id="confirmPassword" ref="confirmPassword" />
          { errors['confirmPassword'] }<br />
          { errors['nonFieldErrors'] }<br />
          <button type="submit" className="button button-primary" ref="submit">
            { this.state.submitted ? <Spinner /> : 'Register' }
          </button>
        </form>
        { errorMessage }
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Register;
