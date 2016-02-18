import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { routeActions } from 'react-router-redux';
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
    state => state.application
  ], (auth, application) => {
    return { auth, application };
  }),
  { loadAuth, showLoginDialog, showRegisterDialog }
)
@Radium
export default class Ground extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
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

    if (this.props.location.pathname === '/login') {
      this.props.showLoginDialog();
    }
    if (this.props.location.pathname === '/register') {
      this.props.showRegisterDialog();
    }
  }

  checkAuth() {
    console.log('hello will login check auth');
    if (this.props.auth.loggedIn) {
      // You already logged in, so do not needed to be here!
      let nextPath = '/';
      if (this.props.location.query.redirect) {
        nextPath = decodeURIComponent(this.props.location.query.redirect);
      } else if (this.props.location.state.nextPathname) {
        nextPath = this.props.location.state.nextPathname;
      }
      this.props.history.replace(nextPath);
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
