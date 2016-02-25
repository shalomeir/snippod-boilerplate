import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import $ from 'jquery';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link as RouterLink } from 'react-router';
const Link = Radium(RouterLink);
import { defineMessages, FormattedMessage } from 'react-intl';
import { shortenString } from 'utils/handleString';

import { AuthButtons, LanguageDropdown } from 'components';

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';

//const shallowEqual = require('fbjs/lib/shallowEqual');
const radiumStyles = require('theme/RadiumStyles');
const styles = require('./NavBarStyles');

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
    className: PropTypes.string,
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
    const { childType, params, className, auth, lang } = this.props;

    let userIsMe;
    if (auth.loggedIn && childType === 'User') {
      if (parseInt(params.userId, 10) === auth.account.id) {
        userIsMe = true;
      }
    }

    const menuActiveClassName = {
      user: classNames({ 'active': userIsMe }),
      setting: classNames({ 'active': (childType === 'Setting') })
    };

    const logo = (
      <Link to="/" href="#" className="header item">
        <img className="logo" src="/images/logo.png" style={styles.logoImage}/>
        <header className="header" style={styles.title}> snippod-boilerplate </header>
      </Link>
    );

    const authButtons = (
      <div className="item" style={radiumStyles.hideAtMobile} >
        <AuthButtons auth={auth}/>
      </div>
    );

    const languageDropdown = (
      <div className="item" style={radiumStyles.hideAtMobile} >
        <LanguageDropdown lang={lang} />
      </div>
    );

    const tocSidebarButton = (
      <div className="toc item" style={[styles.menuItem, radiumStyles.showAtMobile]}>
        <i className="sidebar icon" />
      </div>
    );

    const rightMenu = auth.loggedIn ? (
      <div className="logged-in right menu" style={styles.menuItem}>
        <Link to={`/user/${auth.account.id}`} className={classNames(menuActiveClassName.user, 'blue item')} style={styles.menuItem}>
          <i className="user icon" style={styles.icon}/>
          <span className="username-text" style={radiumStyles.hideAtMobile}> {shortenString(auth.account.username, 12)} </span>
        </Link>
        <Link to="/setting" className={classNames(menuActiveClassName.setting, 'blue item')} style={styles.menuItem}>
          <i className="setting icon" style={styles.icon}/>
          <span className="setting-text" style={radiumStyles.hideAtMobile}> <FormattedMessage {...i18n.settingButton}/> </span>
        </Link>
        {authButtons}
        {languageDropdown}
        {tocSidebarButton}
      </div>
    ) : (
      <div className="logged-out right menu">
        {authButtons}
        {languageDropdown}
        {tocSidebarButton}
      </div>
    );

    return (
      <nav className={classNames(className, 'navbar ui top fixed borderless menu')}>
        <div className="ui container">
          {logo}
          {rightMenu}
        </div>
      </nav>
    );
  }
}
