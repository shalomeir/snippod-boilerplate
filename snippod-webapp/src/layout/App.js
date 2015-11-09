import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import DocumentMeta from 'react-document-meta';
import head from 'constants/head';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'ducks/authentication/auth';
import {
  ToastMessages,
  ModalWindow,
  NavBar,
  Footer
} from '.';

@connect(
  state => ({auth: state.auth}),
  { pushState }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.auth.loggedIn && nextProps.auth.loggedIn) {
      // login
      this.props.pushState(null, '/loginSuccess');
    } else if (this.props.auth.account && !nextProps.auth.account) {
      // logout
      this.props.pushState(null, '/');
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  //handleLogout(event) {
  //  event.preventDefault();
  //  this.props.logout();
  //}

  render() {
    return (
      <div className="app">
        <DocumentMeta {...head}/>
        <ToastMessages/>
        <ModalWindow/>
        <NavBar/>
        <main id="content" className="full-height inner">
          {this.props.children}
        </main>
        <Footer/>
      </div>
    );
  }
}
