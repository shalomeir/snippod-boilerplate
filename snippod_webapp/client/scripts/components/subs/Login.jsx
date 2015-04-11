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


var Login = React.createClass({

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
    this.refs.submit.getDOMNode().disabled = false;
    this.setState({
      submitted: false
    });
  },

  onErrorMessage: function(errorMessage) {
    this.refs.submit.getDOMNode().disabled = false;
    var errorSentence;
    if (typeof errorMessage.info !== 'undefined') {
      errorSentence = errorMessage.info[0].msg;
    } else {
      errorSentence = null;
    }
    this.setState({
      error: errorSentence,
      submitted: false
    });
  },

  login: function(e) {
    e.preventDefault();
    var form = e.currentTarget;

    this.refs.submit.getDOMNode().disabled = true;
    this.setState({
      submitted: true
    });

    userActions.login(form);
  },

  render: function() {

    var error = null;
    if (this.state.error) {
      error = (
        /* jshint ignore:start */
        <div className="error login-error">
          { this.state.error }
          <br/>
          <Link to="forgot">Forgot your password? </Link>
        </div>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div className="login text-center md-modal" id="overlay-content">
        <form method="post" action="/login" onSubmit={ this.login } className="login-form text-left">
          <h1>Login</h1>
          <label htmlFor="email">Email</label><br />
          <input autofocus="autofocus" type="email" name="email" placeholder="Enter your email" id="email" ref="email"/><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" placeholder="Password" id="password" ref="password"/><br />
          <button type="submit" className="button button-primary" ref="submit">
            { this.state.submitted ? <Spinner /> : 'Log in' }
          </button>
        </form>
        { error }
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Login;
