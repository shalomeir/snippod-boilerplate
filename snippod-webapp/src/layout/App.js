import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import Radium from 'radium';
import $ from 'jquery';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { asyncConnect } from 'redux-async-connect';

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

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  createSelector([
    state => state.auth,
    state => state.application
  ], (auth, application) => {
    return { auth, application };
  })
)
@injectIntl
@Radium
export default class App extends Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired
  };

  //static contextTypes = {
  //  router: PropTypes.object.isRequired
  //};

  //Fetching account information using token
  //componentWillMount() {
  //  this._loadDefaultScript();
  //}
  //_loadDefaultScript() {
  //}

  componentWillReceiveProps(nextProps) {
    if (this.props.intl.locale !== nextProps.intl.locale) {
      // i18n Issue: https://github.com/yahoo/react-intl/releases, https://github.com/yahoo/react-intl/issues/162
      // https://github.com/gpbl/react-locale-hot-switch/issues/1 reload full page is a soulution at this time.
      // React Intl components not changed hot swap locale cause shouldComponentUpdate
      console.log('app locale chaged to ' + nextProps.intl.locale);
    }
  }

  render() {
    const locale = this.props.application.lang;

    // i18n Issue: https://github.com/yahoo/react-intl/releases, https://github.com/yahoo/react-intl/issues/162
    // https://github.com/gpbl/react-locale-hot-switch/issues/1 reload full page is a soulution at this time.
    // React Intl components not changed hot swap locale cause shouldComponentUpdate
    // Full reload by key value which is locale by injectIntl
    return (
      <div className="app" key={this.props.intl.locale} >
        <Helmet {...head}/>
        <NavBar auth={this.props.auth} locale={locale} childType={this.props.children.type.name} />
        <div className="empty-box ui container" />
        <main id="content">
          {this.props.children}
        </main>
        <Footer />
        <DialogWindow auth={this.props.auth} application={this.props.application} />
        <Snackbar/>
      </div>
    );
  }
}
