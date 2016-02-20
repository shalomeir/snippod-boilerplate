import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';
import { defineMessages, FormattedMessage } from 'react-intl';

import { AuthButtons, LanguageDropdown } from 'components';

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';
import { logout } from 'ducks/authentication/auth';

const Styles = require('./NavBarStyles');

const i18n = defineMessages({
  settingButton: {
    id: 'layout.navBar.settingButton',
    defaultMessage: 'Setting'
  }
});

//CHECK: This 'lang' prop is needed for refresh i18n. So this is very important to connect with.
@connect(
  null,
  { showLoginDialog, showRegisterDialog, logout }
)
@Radium
export default class NavBar extends Component {
  static propTypes = {
    childType: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {

    const auth = this.props.auth;
    const lang = this.props.locale;
    const menuActiveClassName = {
      user: (this.props.childType === 'User') ? 'active' : '',
      setting: (this.props.childType === 'Setting') ? 'active' : ''
    };

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
      <Link to="/" href="#" className="header item">
        <img className="logo" src="/images/logo.png" style={Styles.logoImage}/>
        <header className="header" style={Styles.title}> snippod-boilerplate </header>
      </Link>
    );

    const title = (
      <header className="header" style={Styles.title}> Snippod boilerplate </header>
    );

    const rightMenu = auth.loggedIn ? (
      <div className="logged-in right menu">
        <Link to={`/user/${auth.account.id}`} className={menuActiveClassName.user + ' blue item'} style={Styles.menuItem}>
            <i className="user icon" style={Styles.icon}></i>
            {auth.account.username}
        </Link>
        <Link to="/setting" className={menuActiveClassName.setting + ' blue item'} style={Styles.menuItem}>
            <i className="setting icon" style={Styles.icon}/>
            <FormattedMessage {...i18n.settingButton} />
        </Link>
        <div className="item">
          <AuthButtons auth={this.props.auth}/>
        </div>
        <div className="item">
          <LanguageDropdown lang={lang} />
        </div>
      </div>
    ) : (
      <div className="logged-out right menu">
        <div className="item">
          <AuthButtons auth={this.props.auth}/>
        </div>
        <div className="item">
          <LanguageDropdown lang={lang} />
        </div>
      </div>
    );

    return (
      <nav className="navbar ui top fixed borderless menu">
        <div className="ui container">
          {logo}
          {rightMenu}
        </div>
      </nav>
    );
  }
}
