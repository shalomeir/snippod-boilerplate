import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { routeActions } from 'react-router-redux';
import { showLoginDialog, showRegisterDialog, redirectReplacePath } from 'ducks/application/application';

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
    state => state.auth
  ], (auth) => {
    return { auth };
  }),
  { showLoginDialog, showRegisterDialog, redirectReplacePath }
)
@Radium
export default class Ground extends Component {

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
      }
      if (this.props.location.pathname === '/register') {
        this.props.showRegisterDialog();
      }
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
