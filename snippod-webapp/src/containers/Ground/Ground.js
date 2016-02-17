import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { replaceState } from 'redux-router';
import { load as loadAuth } from 'ducks/authentication/auth';
import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';

const Styles = {
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
    state => state.auth,
    state => state.application,
    state => state.router,
  ], (auth, application, router) => {
    return { auth, application, router };
  }),
  { replaceState, loadAuth, showLoginDialog, showRegisterDialog }
)
@Radium
export default class Ground extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    replaceState: PropTypes.func.isRequired,
    loadAuth: PropTypes.func.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.checkAuth = this.checkAuth.bind(this);
  }

  componentWillMount() {
    if (!this.props.auth.loaded) {
      this.props.loadAuth()
        .then(this.checkAuth);
    } else {
      this.checkAuth();
    }

    if (this.props.router.location.pathname === '/login') {
      this.props.showLoginDialog();
    }
    if (this.props.router.location.pathname === '/register') {
      this.props.showRegisterDialog();
    }
  }

  checkAuth() {
    console.log('hello will login check auth');
    if (this.props.auth.loggedIn) {
      // You already logged in, so do not needed to be here!
      let nextPath = '/';
      if (this.props.router.location.query.redirect) {
        nextPath = decodeURIComponent(this.props.router.location.query.redirect);
      } else if (this.props.router.location.state && this.props.router.location.state.nextPathname) {
        nextPath = this.props.router.location.state.nextPathname;
      }
      this.props.replaceState(null, nextPath);
    }
  }

  render() {
    return (
      <div className="loading ui text container" style={Styles.container}>
        <div className="ui message">
          <div className="header">
            Login please
          </div>
          <p>Login and follow web page you want to see.</p>
        </div>
      </div>
    );
  }
}
