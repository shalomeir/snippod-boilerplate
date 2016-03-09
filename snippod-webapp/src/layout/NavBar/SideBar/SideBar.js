import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import { shortenString } from 'utils/handleString';

import { AuthButtons, LanguageDropdown } from 'components';

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';

const styles = require('./SideBarStyles');

const i18n = defineMessages({
  welcomeText: {
    id: 'layout.sideBar.welcomeText',
    defaultMessage: 'Welcome!'
  },

  homeButton: {
    id: 'layout.sideBar.homeButton',
    defaultMessage: 'Home'
  },

  userButton: {
    id: 'layout.sideBar.userButton',
    defaultMessage: 'My Page'
  },

  settingButton: {
    id: 'layout.sideBar.settingButton',
    defaultMessage: 'Setting'
  },

  loginButton: {
    id: 'layout.sideBar.loginButton',
    defaultMessage: 'Login first'
  },

  footerMessage: {
    id: 'layout.sideBar.footerMessage',
    defaultMessage: 'Join this repository. '
  }
});

@connect(
  null,
  { showLoginDialog, showRegisterDialog }
)
@injectIntl
@Radium
export default class SideBar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    childType: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    className: PropTypes.string,
    auth: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired
  };

  render() {
    //Almost similar with NavBar
    const { childType, params, className, auth, lang, intl: { formatMessage } } = this.props;

    let userIsMe;
    if (auth.loggedIn && childType === 'user') {
      if (parseInt(params.userId, 10) === auth.account.id) {
        userIsMe = true;
      }
    }

    const menuActiveClassName = {
      home: classNames({ 'active': (childType === '') }),
      user: classNames({ 'active': userIsMe }),
      setting: classNames({ 'active': (childType === 'setting') })
    };

    const recommendLogin = (
      <div className="item ui center aligned container">
        <button className="ui green basic button"
                onClick={this.props.showLoginDialog}>
          {formatMessage(i18n.loginButton)}
        </button>
      </div>
    );

    const userProfile = auth.loggedIn ? (
      <div className={classNames('item')}>
        <div style={styles.welcome} >{formatMessage(i18n.welcomeText)}</div>
        <Link to={`/user/${auth.account.id}`} style={styles.menuItem}>
          <i className="user icon left inverted" style={styles.icon}/>
          <h4 className="username-text ui header inverted" style={styles.iconText}>
            {shortenString(auth.account.username, 16)} </h4>
        </Link>
      </div>
    ) : null;

    const homeMenu = (
      <Link to="/" className={classNames(menuActiveClassName.home, 'blue item')}>
        {formatMessage(i18n.homeButton)}
      </Link>
    );

    const userMenu = auth.loggedIn ? (
      <Link to={`/user/${auth.account.id}`} className={classNames(menuActiveClassName.user, 'blue item')}>
        {formatMessage(i18n.userButton)}
      </Link>
    ) : null;

    const settingMenu = auth.loggedIn ? (
      <Link to="/setting" className={classNames(menuActiveClassName.setting, 'blue item')}>
        {formatMessage(i18n.settingButton)}
      </Link>
    ) : null;

    //For Logout button
    const authButtons = (
      <div className="ui item center aligned container" >
        <AuthButtons auth={auth} style={styles.authButton}/>
      </div>
    );

    //Sidebar's footer
    const githubButton = (<iframe src="https://ghbtns.com/github-btn.html?user=shalomeir&repo=snippod-boilerplate&type=star&count=true" frameBorder="0" scrolling="0" width="90px" height="20px"
                                  style={styles.githubButton}/>);

    const sidebarFooter = (
      <div className="ui borderless item center aligned container" >
        <div className="ui horizontal inverted small list" style={styles.footerMessage}>
          <FormattedMessage {...i18n.footerMessage} />
          <br/>{githubButton}
        </div>
      </div>
    );

    return (
      <div className={classNames('ui vertical inverted sidebar menu', className)}>
        {auth.loggedIn ? userProfile : recommendLogin}
        <div className="ui vertical inverted large menu">
          {homeMenu}
          {auth.loggedIn ? userMenu : null}
          {auth.loggedIn ? settingMenu : null}
        </div>
        <div className="item" >
          <LanguageDropdown lang={lang} className="small"/>
        </div>
        {auth.loggedIn ? authButtons : null}
        {sidebarFooter}
      </div>
    );
  }
}
