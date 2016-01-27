/**
 * THIS IS THE React web app ENTRY POINT.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ReduxRouter } from 'redux-router';
import { IntlProvider } from 'react-intl';
import * as i18n from './i18n';

import getRoutes from './routes';

function getRootChildren(props, context) {
  const intlData = {
    locale: props.application.locale,
    messages: i18n[props.application.locale]
  };
  const rootChildren = [
    <IntlProvider key="intl" {...intlData}>
      <ReduxRouter routes={getRoutes(context.store)} />
    </IntlProvider>
  ];

  return rootChildren;
}

@connect(
  createSelector([
    state => state.application
  ], (application) => {
    return { application };
  })
)
export default class Root extends Component {

  static propTypes = {
    application: PropTypes.object.isRequired
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
