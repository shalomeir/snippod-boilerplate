import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
const Styles = require('./NavBarStyles');
const FlatButton = require('material-ui/lib/flat-button');

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';
import { logout } from 'ducks/authentication/auth';


@connect(
  createSelector([
  ], () => {
    return {};
  }),
  { showLoginDialog, showRegisterDialog, logout }
)
@Radium
export default class NavBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {

    const auth = this.props.auth;
    //var navLinks = auth.loggedIn ? (
    //  /* jshint ignore:start */
    //  <div className="nav-list float-right">
    //    <span className="nav-item">
    //      Hi, <Link to={`/user/${account.id}`}>{account.username ? account.username : account.email}</Link>
    //    </span>
    //    <span className="nav-item">
    //      <Link to="/settings">My Account</Link>
    //    </span>
    //    <span className="nav-item">
    //      <Link to="/logout" onClick={this.handleLogout}>Logout</Link>
    //    </span>
    //  </div>
    //  /* jshint ignore:end */
    //) : (
    //  /* jshint ignore:start */
    //  <div className="nav-list float-right">
    //    <span className="nav-item">
    //      <a onClick={ UIActions.showOverlay.bind(this,'login') }>Sign In</a>
    //    </span>
    //    <span className="nav-item">
    //      <a onClick={ UIActions.showOverlay.bind(this,'register') }>Register</a>
    //    </span>
    //  </div>
    //  /* jshint ignore:end */
    //);

    const logo = (
      <div href="#" className="header item">
        <img className="logo" src="/images/logo.png" style={Styles.logoImage}/>
        <header className="header" style={Styles.title}> snippod-boilerplate </header>
      </div>
    );

    const title = (
      <header className="header" style={Styles.title}> Snippod boilerplate </header>
    );

    const rightMenu = auth.loggedIn ? (
      <div className="logged">
        <div className="item">
          <a className="ui button">Log in</a>
        </div>
        <div className="item">
          <a className="ui primary button">Sign Up</a>
        </div>
      </div>
    ) : (
      <div style={Styles.navBarSubDiv}>
        <FlatButton label="Login" onTouchTap={this.props.showLoginDialog}
          {...Styles.flatButton} />
        <FlatButton label="Register" onTouchTap={this.props.showRegisterDialog}
          {...Styles.flatButton} />
      </div>
    );

    return (
      <nav className="navbar ui large top fixed borderless menu">
        <div className="ui container">
          {logo}
          <div className="right menu">
            <div className="item">
              <a className="ui button">Log in</a>
            </div>
            <div className="item">
              <a className="ui primary button">Sign Up</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
