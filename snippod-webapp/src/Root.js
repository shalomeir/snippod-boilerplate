/**
 * THIS IS THE React web app ENTRY POINT.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { IntlProvider } from 'react-intl';
import * as i18n from './i18n';

import getRoutes from './routes';

function getRootChildren(props, context) {
  const intlData = {
    locale: props.auth.locale,
    messages: i18n[props.auth.locale]
  };
  const rootChildren = [
    <IntlProvider key="intl" {...intlData}>
      <ReduxRouter routes={getRoutes(context.store)} />
    </IntlProvider>
  ];

  if ( typeof(__DEVTOOLS__) && __DEVTOOLS__ ) {
    //Render DevTools in App
    //const DevTools = require('./containers/DevTools/DevTools');
    //rootChildren.push(<DevTools key="devtools" />);

    //Open DevTools in a New Window
    const showDevTools = require('./helpers/showDevTools');
    showDevTools(context.store);

  }
  return rootChildren;
}

@connect( state => ({auth: state.auth}) )
export default class Root extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>{getRootChildren(this.props, this.context)}</div>
    );
  }
}
