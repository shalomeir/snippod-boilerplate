import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { defineMessages, FormattedMessage } from 'react-intl';
import { showLoginDialog, showRegisterDialog, redirectReplacePath } from 'ducks/application/application';

const i18n = defineMessages({
  loginMessageHeader: {
    id: 'ground.login.messageHeader',
    defaultMessage: 'Log-in'
  },
  loginMessageBody: {
    id: 'ground.login.messageBody',
    defaultMessage: 'Jump in our website.'
  },
  registerMessageHeader: {
    id: 'ground.register.messageHeader',
    defaultMessage: 'Register'
  },
  registerMessageBody: {
    id: 'ground.register.messageBody',
    defaultMessage: 'Create your account.'
  }
});

const styles = {
  container: {
    marginTop: '1em',
    marginBottom: '1em'
  },

  icon: {
    marginTop: '2.2em',
    marginBottom: '2.2em'
  }
};

@connect(
  createSelector([
    state => state.auth
  ], (auth) => {
    return { auth };
  }),
  { showLoginDialog, showRegisterDialog, redirectReplacePath }
)
@Radium
export default class Posts extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired,
    redirectReplacePath: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.checkAuth = this.checkAuth.bind(this);
  }

  componentWillMount() {
    const redirect = this.checkAuth();
    if (!redirect) {
      if (this.props.location.pathname === '/login') {
        this.props.showLoginDialog();
        this.setState({ page: 'login' });
      }
      if (this.props.location.pathname === '/register') {
        this.props.showRegisterDialog();
        this.setState({ page: 'register' });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.loggedIn && nextProps.auth.loggedIn) {
      this.props.redirectReplacePath('/');
    }
  }

  checkAuth() {
    console.log('hello will login check auth');
    if (this.props.auth.loggedIn) {
      // You already logged in, so do not needed to be here!
      this.props.redirectReplacePath('/');
      return true;
    }
    return false;
  }

  render() {
    const messageHeader = this.state.page === 'login' ? i18n.loginMessageHeader : i18n.registerMessageHeader;
    const messageBody = this.state.page === 'login' ? i18n.loginMessageBody : i18n.registerMessageBody;

    return (
      <div className="loading ui text container main-container">
        <Helmet title={this.state.page === 'login' ? 'Login' : 'Register'} />
        <div className="ui message">
          <div className="header">
            <FormattedMessage {...messageHeader} />
          </div>
          <p><FormattedMessage {...messageBody} /></p>
        </div>
      </div>
    );
  }
}
