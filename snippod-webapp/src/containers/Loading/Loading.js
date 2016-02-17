import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { replaceState } from 'redux-router';
import { load as loadAuth } from 'ducks/authentication/auth';

const Styles = {
  icon: {
    marginTop: '2.2em',
    marginBottom: '2.2em'
  }
};

@connect(
  createSelector([
    state => state.auth,
    state => state.application,
    state => state.router
  ], (auth, application, router) => {
    return { auth, application, router };
  }),
  { replaceState, loadAuth }
)
@Radium
export default class Loading extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    replaceState: PropTypes.func.isRequired,
    loadAuth: PropTypes.func.isRequired
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
  }

  checkAuth() {
    if (!this.props.auth.loggedIn) {
      // oops, not logged in, so can't be here!
      let redirectQuery;
      if (this.props.router.location.state && this.props.router.location.state.nextPathname) {
        redirectQuery = { redirect: encodeURIComponent(this.props.router.location.state.nextPathname) };
      }
      this.props.replaceState(this.props.router.location.state, '/login', redirectQuery);
    } else {
      console.log('hello will loading checked and loggedin SUCCESS auth');
      let nextPath = '/';
      if (this.props.router.location.query.redirect) {
        nextPath = decodeURIComponent(this.props.router.location.query.redirect);
      } else if (this.props.router.location.state.nextPathname) {
        nextPath = this.props.router.location.state.nextPathname;
      }
      this.props.replaceState(null, nextPath);
    }
  }

  render() {
    return (
      <div className="loading ui text container center aligned">
        <div className="ui active inline loader" style={Styles.icon}></div>
      </div>
    );
  }
}
