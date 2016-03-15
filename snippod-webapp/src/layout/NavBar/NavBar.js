import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import $ from 'jquery';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import MediaQuery from 'react-responsive';
import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);
import { injectIntl, intlShape, defineMessages } from 'react-intl';
import { shortenString } from 'utils/handleString';

import { AuthButtons, LanguageDropdown } from 'components';

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';

//const shallowEqual = require('fbjs/lib/shallowEqual');
import responsivePoint from 'theme/semantic-variables';
const radiumStyles = require('theme/RadiumStyles');
const styles = require('./NavBarStyles');

const i18n = defineMessages({
  settingButton: {
    id: 'layout.navBar.settingButton',
    defaultMessage: 'Setting'
  }
});


@connect(
  null,
  { showLoginDialog, showRegisterDialog }
)
@injectIntl
@Radium
export default class NavBar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
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

    //console.log('radium resolve media queries :' + ra);

    const { childType, params, className, auth, lang, intl: { formatMessage } } = this.props;

    let userIsMe = false;
    if (auth.loggedIn && childType === 'user') {
      if (parseInt(params.userId, 10) === auth.account.id) {
        userIsMe = true;
      }
    }

    const menuActiveClassName = {
      user: classNames({ 'active': userIsMe }),
      setting: classNames({ 'active': (childType === 'setting') })
    };

    const logo = (
      <Link to="/" href="#" className="header item">
        <img className="logo" src="/images/logo.png" style={styles.logoImage}/>
        <MediaQuery maxWidth={responsivePoint['@tabletLesspoint']}>
          <header className="header" style={styles.title}> snippod{(<br/>)}boilerplate </header>
        </MediaQuery>
        <MediaQuery minWidth={responsivePoint['@tabletBreakpoint']}>
          <header className="header" style={styles.title}> snippod-boilerplate </header>
        </MediaQuery>
      </Link>
    );

    const authButtons = (
      <div className="item" style={styles.smallAtMobile} >
        <MediaQuery maxWidth={responsivePoint['@tabletLesspoint']}>
          <AuthButtons auth={auth} className="mini"/>
        </MediaQuery>
        <MediaQuery minWidth={responsivePoint['@tabletBreakpoint']}>
          <AuthButtons auth={auth}/>
        </MediaQuery>
      </div>
    );

    const languageDropdown = (
      <div className="item" style={radiumStyles.hideAtMobile} >
        <LanguageDropdown lang={lang} className="navbar" />
      </div>
    );

    const tocSidebarButton = (
      <div className="toc icon button item" style={styles.menuItem}>
        <i className="sidebar icon" />
      </div>
    );

    const rightMenu = auth.loggedIn ? (
      <div className="logged-in right menu" style={styles.menuItem}>
        <Link to={`/user/${auth.account.id}`} className={classNames(menuActiveClassName.user, 'blue item')} style={[styles.menuItem, styles.mobileItem]}>
          <i className="user icon" style={styles.icon}/>
          <span className="username-text" style={radiumStyles.hideAtMobile}> {shortenString(auth.account.username, 12)} </span>
        </Link>
        <Link to="/setting" className={classNames(menuActiveClassName.setting, 'blue item')} style={[styles.menuItem, styles.mobileItem]}>
          <i className="setting icon" style={styles.icon}/>
          <span className="setting-text" style={radiumStyles.hideAtMobile}>{formatMessage(i18n.settingButton)}</span>
        </Link>
        {tocSidebarButton}
      </div>
    ) : (
      <div className="logged-out right menu">
        {authButtons}
        {tocSidebarButton}
      </div>
    );

    return (
      <nav className={classNames('navbar ui top fixed borderless menu', className)}>
        <div className="ui container">
          {logo}
          {rightMenu}
        </div>
      </nav>
    );
  }
}
