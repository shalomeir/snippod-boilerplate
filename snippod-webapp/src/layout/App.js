import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import $ from 'jquery';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import connectData from 'helpers/connectData';
import { pushState } from 'redux-router';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import head from 'constants/head';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'ducks/authentication/auth';
import {
  NavBar,
  Footer,
  DialogWindow,
  Snackbar,
} from '.';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

function fetchData(getState, dispatch) {
  const promises = [];
  if (!isAuthLoaded(getState())) {
    promises.push(dispatch(loadAuth()));
  }
  return Promise.all(promises);
}

@connectData(fetchData)
@connect(
  createSelector([
    state => state.auth,
    state => state.application,
    state => state.router,
  ], (auth, application, router) => {
    return { auth, application, router };
  }),
  { pushState }
)
@Radium
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  //componentDidMount() {
  //  this._loadDefaultScript();
  //}

  //_loadDefaultScript() {
  //}

  //componentWillReceiveProps(nextProps) {
  //  if (!this.props.auth.loggedIn && nextProps.auth.loggedIn) {
  //    // login
  //    this.props.pushState(null, '/loginSuccess');
  //  } else if (this.props.auth.account && !nextProps.auth.account) {
  //    // logout
  //    this.props.pushState(null, '/');
  //  }
  //}

  //handleLogout(event) {
  //  event.preventDefault();
  //  this.props.logout();
  //}

  render() {
    return (
      <div className="app">
        <Helmet {...head}/>
        <NavBar {...this.props} />
        <div className="empty-box ui container" />
        <main id="content">
          {this.props.children}
        </main>
        <Footer />
        <DialogWindow/>
        <Snackbar/>
      </div>
    );
  }
}
