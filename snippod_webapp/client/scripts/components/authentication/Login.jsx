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


var Login = React.createClass({

  mixins: [
    PureRenderMixin,
    Reflux.listenTo(AuthStore, 'resetForm'),
    Reflux.listenTo(ComponentMessageStore, 'onErrorMessage'),
  ],

  getInitialState: function() {
    return {
      loggedIn: false,
      errors: '',
      submitted: false
    };
  },

  resetForm: function() {
    var auth = AuthStore.getAuth();
    if(this.state.loggedIn !== auth.loggedIn){
      this.refs.email.getDOMNode().value = '';
      this.refs.password.getDOMNode().value = '';
      this.refs.submit.getDOMNode().disabled = false;
      this.setState({
        loggedIn: auth.loggedIn,
        errors: '',
        submitted: false
      });
    }
  },

  onErrorMessage: function() {
    var errorMessage = ComponentMessageStore.getComponentMessages();
    this.refs.submit.getDOMNode().disabled = false;
    var errorSentence = null;
    if (typeof errorMessage.message !== 'undefined') {
      errorSentence = errorMessage.message;
    }
    this.setState({
      errors: errorSentence,
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

    AuthAccountActions.login(form);
  },

  render: function() {

    var errors = null;
    if (this.state.errors) {
      errors = (
        /* jshint ignore:start */
        <div className="error login-error">
          { this.state.errors }
          <br/>
          <Link to="/login/forgot">Forgot your password? </Link>
        </div>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div className="login text-center md-modal" id="overlay-content">
        <form method="post" action="/auth/login/" onSubmit={ this.login } className="login-form text-left">
          <h1>Login</h1>
          <label htmlFor="email">Email ID</label><br />
          <input autofocus="autofocus" type="email" name="email" placeholder="Enter your email" id="email" ref="email"/><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" placeholder="Password" id="password" ref="password"/><br />
          <button type="submit" className="button button-primary" ref="submit">
            { this.state.submitted ? <Spinner /> : 'Log in' }
          </button>
        </form>
        { errors }
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Login;
