import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import $ from 'jquery';
import classNames from 'classnames';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

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

const styles = {
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
@injectIntl
@Radium
export default class AuthButtons extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired,
    logoutAndFollow: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  };

  render() {
    const { auth, className, style, intl: { formatMessage } } = this.props;

    const authButtons = auth.loggedIn ? (
      <button className= {classNames('ui basic grey button', className)} ref="authButton"
              style={[styles.button, style]} onClick={this.props.logoutAndFollow}>
        {formatMessage(i18n.logoutButton)}
      </button>
    ) : (
      <div className= {classNames('ui buttons', className)} ref="authButtons"
           style={[style]}>
        <button className="ui left attached green basic button" style={ styles.button }
                onClick={this.props.showLoginDialog}>
          {formatMessage(i18n.loginButton)}
        </button>
        <button className="ui right attached blue basic button" style={ styles.button }
                onClick={this.props.showRegisterDialog}>
          {formatMessage(i18n.registerButton)}
        </button>
      </div>
    );
    return authButtons;
  }
}
