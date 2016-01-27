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
      <div style={Styles.navBarSubDiv}>
        <i className="fa fa-home" style={Styles.logo}> Snippod boilerplate</i>
      </div>
    );

    const title = (
      <header className="header" style={Styles.title}> Snippod boilerplate </header>
    );

    const rightButtons = auth.loggedIn ? (
      <div style={Styles.navBarSubDiv}>
        <FlatButton label="User Profile" onTouchTap={this.props.showLoginDialog}
          {...Styles.flatButton} />
        <FlatButton label="Logout" onTouchTap={this.props.logout}
          {...Styles.flatButton} />
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
      <nav className="layout">
        <AppBar
          iconElementLeft={logo}
          title={title}
          iconElementRight={rightButtons} />
        <header className="header">
          <div className="navbar">
            <div className="menu-title">Snippod's Navbar2</div>
          </div>
        </header>
      </nav>
    );
  }
}
