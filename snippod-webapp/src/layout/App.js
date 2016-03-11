import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import $ from 'jquery';
import { StyleRoot } from 'radium';

import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { asyncConnect } from 'redux-async-connect';

import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import head from 'constants/head';

import { isLoaded as isAuthLoaded, load as loadAuth } from 'ducks/authentication/auth';
import { switchLangIfDiffrent, showPopupModal, closePopupModal } from 'ducks/application/application';

import {
  ToastrMessages,
  DialogWindow,
  PopupModalWindow,
  NavBar,
  SideBar,
  Footer,
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
      promises.push(dispatch(loadAuth()).then((response) => {
        dispatch(switchLangIfDiffrent());
      }));
    }
    return Promise.all(promises);
  }
}])
@connect(
  createSelector([
    state => state.auth,
    state => state.application,
    state => state.messages
  ], (auth, application, messages) => {
    return { auth, application, messages };
  }),
  { showPopupModal, closePopupModal }
)
@injectIntl
export default class App extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    children: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,

    showPopupModal: PropTypes.func.isRequired,
    closePopupModal: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  //constructor() {
  //  super();
  //}

  //https://github.com/facebook/react/issues/2517
  //static childContextTypes = {
  //  location: PropTypes.object.isRequired,
  //  params: PropTypes.object
  //}
  //getChildContext() {
  //  return {
  //    location: this.props.location,
  //    params: this.props.params
  //  };
  //}

  //Fetching account information using token
  //componentWillMount() {
  //  this._loadDefaultScript();
  //}
  //_loadDefaultScript() {
  //}

  componentDidMount() {
    this.constructor.attachSidebar();
  }

  componentWillReceiveProps(nextProps) {
    // if we changed routes. and location have a modal state.
    if (!this.props.application.isShowModal &&
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state && nextProps.location.state.modal
    ) {
      // save the old children
      this.previousChildren = this.props.children;
      const { location } = this.props;
      const returnTo = {
        pathname: location.pathname,
        query: location.query,
        state: location.state
      };
      this.props.showPopupModal(returnTo);
    }

    if (this.props.application.isShowModal &&
      nextProps.location.key !== this.props.location.key &&
      (!nextProps.location.state || !nextProps.location.state.modal)
    ) {
      // remove previousChildren
      this.previousChildren = null;
      this.props.closePopupModal();
    }
  }

  componentDidUpdate(PrevProps) {
    if (PrevProps.intl.locale !== this.props.intl.locale) {
      this.constructor.attachSidebar();
    }
  }

  static attachSidebar() {
    // create sidebar and attach to menu open
    $('.ui.sidebar')
      .sidebar({
        context: $('.fullscreen.pushable'),
        delaySetup: true
      })
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('attach events', '.toc.item')
    ;
  }

  render() {
    const { params, auth, application, application: { lang, returnTo, isShowModal }, messages } = this.props;
    const { router } = this.context;
    const { locale } = this.props.intl;
    const childType = this.props.location.pathname.split('/')[1];

    // i18n Issue: https://github.com/yahoo/react-intl/releases, https://github.com/yahoo/react-intl/issues/162
    // https://github.com/gpbl/react-locale-hot-switch/issues/1 reload full page is a soulution at this time.
    // React Intl components not changed hot swap locale cause shouldComponentUpdate
    // Full reload by key value which is locale by injectIntl
    return (
      <div id="app" className="app" key={locale} >
        <Helmet {...head}/>
        <StyleRoot >
          <div id="full-screen" className="fullscreen pushable">
            <SideBar className="sub-app ui right sidebar"
                     auth={auth} lang={lang} childType={childType} params={params} />
            <div id="main-app" className="main-app pusher">
              <div id="wrap-content">
                <NavBar auth={auth} lang={lang} childType={childType} params={params} />
                <main id="main-content">
                  {this.previousChildren ? this.previousChildren : this.props.children}
                </main>
              </div>
              <Footer />
            </div>
          </div>
          <div id="background-app" className="background-app">
            <ToastrMessages messages={messages} />
            <DialogWindow auth={auth} application={application} />
            <PopupModalWindow router={router}
                              application={application}>
              {this.previousChildren ? this.props.children : null}
            </PopupModalWindow>
          </div>
        </StyleRoot>
      </div>
    );
  }
}
