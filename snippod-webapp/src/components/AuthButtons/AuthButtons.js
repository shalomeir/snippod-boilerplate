import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import $ from 'jquery';
import { defineMessages, FormattedMessage } from 'react-intl';

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';
import { logoutAndFollow } from 'ducks/authentication/auth';

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
    width: '5.8em',
    textAlign: 'center',
    paddingLeft: 'inherit',
    paddingRight: 'inherit'
  }
};

@connect(
  null,
  { showLoginDialog, showRegisterDialog, logoutAndFollow }
)
export default class AuthButtons extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired,
    logoutAndFollow: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
  };

  static defaultProps = { className: '' };

  render() {
    const { auth } = this.props;

    const authButtons = auth.loggedIn ? (
      <button className= {this.props.className + ' ui basic grey button'} ref="authButton"
              style={ Styles.button } onClick={this.props.logoutAndFollow}>
        <FormattedMessage {...i18n.logoutButton} />
      </button>
    ) : (
      <div className= {this.props.className + ' ui buttons'} ref="authButtons"
           style={ Styles.buttons }>
        <button className="ui left attached green basic button" style={ Styles.button }
                onClick={this.props.showLoginDialog}>
          <FormattedMessage {...i18n.loginButton} />
        </button>
        <button className="ui right attached blue basic button" style={ Styles.button }
                onClick={this.props.showRegisterDialog}>
          <FormattedMessage {...i18n.registerButton} />
        </button>
      </div>
    );
    return authButtons;
  }
}
