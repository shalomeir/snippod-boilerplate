import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import connectData from 'helpers/connectData';
import { pushState } from 'redux-router';
import Radium, { Style } from 'radium';
import radiumRules from '../theme/radium-rules';
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
    state => state.auth
  ], (auth) => {
    return { auth };
  }),
  { pushState }
)
@Radium
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

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
        <Style rules={radiumRules}/>
        <Helmet {...head}/>
        <NavBar auth={this.props.auth} pushState={this.props.pushState} />
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
