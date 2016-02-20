import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';
import { defineMessages, FormattedMessage } from 'react-intl';

import { AuthButtons, LanguageDropdown } from 'components';

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';

//const shallowEqual = require('fbjs/lib/shallowEqual');

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
  { showLoginDialog, showRegisterDialog }
)
@Radium
export default class NavBar extends Component {
  static propTypes = {
    childType: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired,
  };

  //static contextTypes = {
  //  params: PropTypes.object.isRequired
  //};
  //https://github.com/facebook/react/issues/2517
  //shouldComponentUpdate(nextProps, nextState, nextContext) {
  //  return !shallowEqual(this.props, nextProps) ||
  //    !shallowEqual(this.state, nextState) ||
  //    !shallowEqual(this.context, nextContext); // this will throw without context, read on
  //}

  render() {
    const { childType, params, auth, lang } = this.props;

    let userIsMe;
    if (auth.loggedIn && childType === 'User') {
      if (parseInt(params.userId, 10) === auth.account.id) {
        userIsMe = true;
      }
    }

    const menuActiveClassName = {
      user: userIsMe ? 'active' : '',
      setting: (childType === 'Setting') ? 'active' : ''
    };

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
          <AuthButtons auth={auth}/>
        </div>
        <div className="item">
          <LanguageDropdown lang={lang} />
        </div>
      </div>
    ) : (
      <div className="logged-out right menu">
        <div className="item">
          <AuthButtons auth={auth}/>
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
