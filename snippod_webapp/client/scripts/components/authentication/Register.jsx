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
      errorPrescriptions: null,
      errors: null,
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

  onErrorMessage: function() {
    var errorMessage = ComponentMessageStore.getComponentMessages();
    this.refs.submit.getDOMNode().disabled = false;
    var errorSentence = null;
    if (typeof errorMessage.message !== 'undefined') {
      errorSentence = errorMessage.message;
    }
    this.setState({
      errorPrescriptions: errorMessage.errors,
      errors: errorSentence,
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

    var errors = null;
    var errorLines = {};
    var errorPrescriptions = this.state.errorPrescriptions;

    if (this.state.errors) {
      errors = (
        /* jshint ignore:start */
        <div className="error login-error">
          { this.state.errors }
        </div>
        /* jshint ignore:end */
      );
    }

    if (errorPrescriptions) {
      for (var key in errorPrescriptions) {
        if(errorPrescriptions.hasOwnProperty(key)) {
          errorLines[key] = (
            /* jshint ignore:start */
            <div className="error login-error">
              { errorPrescriptions[key] }
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
          { errorLines['email'] }<br />
          <label htmlFor="username">Username</label><br />
          <input type="text" name="username" id="username" placeholder="Username" ref="username" />
          { errorLines['username'] }<br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" placeholder="Password" id="password" ref="password" />
          { errorLines['password'] }<br />
          <label htmlFor="confirmPassword">Confirm Password</label><br />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" id="confirmPassword" ref="confirmPassword" />
          { errorLines['confirmPassword'] }<br />
          { errorLines['nonFieldErrors'] }<br />
          <button type="submit" className="button button-primary" ref="submit">
            { this.state.submitted ? <Spinner /> : 'Register' }
          </button>
        </form>
        { errors }
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Register;
