import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { defineMessages, FormattedMessage } from 'react-intl';

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';
import { logout } from 'ducks/authentication/auth';

const i18n = defineMessages({
  loginButton: {
    id: 'comp.authButtons.loginButton',
    defaultMessage: 'Login'
  },
  registerButton: {
    id: 'comp.authButtons.registerButton',
    defaultMessage: 'Register'
  },
  logoutButton: {
    id: 'comp.authButtons.logoutButton',
    defaultMessage: 'Logout'
  }
});

const Styles = {
  button: {
    width: '6.2em',
    textAlign: 'center'
  },
};

@connect(
  null,
  { showLoginDialog, showRegisterDialog, logout }
)
export default class AuthButtons extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  componentDidMount() {

  }


  render() {
    const auth = this.props.auth;

    const authButtons = auth.loggedIn ? (
      <button className= {this.props.className + ' ui basic grey button'} ref="authButton"
              style={ Styles.button }>
        <FormattedMessage {...i18n.logoutButton} />
      </button>
    ) : (
      <div className= {this.props.className + ' ui buttons'} ref="authButtons"
           style={ Styles.buttons }>
        <button className="ui left attached green basic button" style={ Styles.button }>
          <FormattedMessage {...i18n.loginButton} />
        </button>
        <button className="ui right attached blue basic button" style={ Styles.button }>
          <FormattedMessage {...i18n.registerButton} />
        </button>
      </div>
    );

    return authButtons;
  }
}
