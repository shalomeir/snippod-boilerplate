/**
* Created by shalomeir on 15. 3. 16..
*/
'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),
    { Link } = Router,
    // components
    Spinner = require('../modules/Spinner.jsx'),
    // stores
    userStore = require('../../stores/userStore'),
    // actions
    userActions = require('../../actions/userActions'),
    messagesActions = require('../../actions/messagesActions');


var Register = React.createClass({

  mixins: [
    Reflux.listenTo(userStore, 'resetForm'),
    Reflux.listenTo(messagesActions.setError, 'onErrorMessage')
  ],

  getInitialState: function() {
    return {
      error: '',
      submitted: false
    };
  },

  resetForm: function() {
    this.refs.email.getDOMNode().value = '';
    this.refs.password.getDOMNode().value = '';
    this.refs.confirmPassword.getDOMNode().value = '';
    this.refs.submit.getDOMNode().disabled = false;
    this.setState({
      submitted: false
    });
  },

  onErrorMessage: function(errorMessage) {
    this.refs.submit.getDOMNode().disabled = false;
    var errorSentence;
    if (typeof errorMessage.errors !== 'undefined') {
      errorSentence = errorMessage.errors[0].msg;
    } else {
      errorSentence = null;
    }
    this.setState({
      error: errorSentence,
      submitted: false
    });
  },

  registerUser: function(e) {
    e.preventDefault();
    var form = e.currentTarget;

    this.refs.submit.getDOMNode().disabled = true;
    this.setState({
      submitted: true
    });

    userActions.register(form);
  },

  render: function() {

    var error = null;
    if (this.state.error) {
      error = (
        /* jshint ignore:start */
        <div className="error login-error">
          { this.state.error }
        </div>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div className="login md-modal text-center" id="overlay-content">
        <form onSubmit={ this.registerUser } id="signup-form" method="post" action="/user" className="login-form text-left">
          <h1>Register</h1>
          <label htmlFor="email">Email</label><br />
          <input type="text" name="email" id="email" placeholder="Email" ref="email" /><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" placeholder="Password" id="password" ref="password" /><br />
          <label htmlFor="confirmPassword">Confirm Password</label><br />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" id="confirmPassword" ref="confirmPassword" /><br />
          <button type="submit" className="button button-primary" ref="submit">
            { this.state.submitted ? <Spinner /> : 'Register' }
          </button>
        </form>
        { error }
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Register;
