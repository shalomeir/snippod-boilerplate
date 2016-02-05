import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import $ from 'jquery';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { routeActions } from 'react-router-redux';

//import { pushState } from 'redux-router';
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

@connect(
  createSelector([
    state => state.auth,
    state => state.application,
  ], (auth, application) => {
    return { auth, application };
  }),
  { push: routeActions.push }
)
@Radium
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static reduxAsyncConnect(params, store) {
    const { dispatch, getState } = store;
    const promises = [];

    //if (!isInfoLoaded(getState())) {
    //  promises.push(dispatch(loadInfo()));
    //}
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

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
        <NavBar auth={this.props.auth} application={this.props.application} push={this.props.push} />
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
