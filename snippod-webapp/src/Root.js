/**
 * THIS IS THE React web app ENTRY POINT.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Router, browserHistory } from 'react-router';

import { ReduxAsyncConnect } from 'redux-async-connect';

//import { ReduxRouter } from 'redux-router';
import { IntlProvider } from 'react-intl';
import * as i18n from './i18n';

import getRoutes from './routes';

function getRootChildren(props, context) {
  const intlData = {
    lang: props.application.lang,
    messages: i18n[props.application.lang]
  };
  const { client } = props;
  const bindReduxAsyncConnect = (inProps) =>
    <ReduxAsyncConnect {...inProps} helpers={{ client }} />;

  const rootChildren = [
    <IntlProvider key="intl" {...intlData}>
      <Router render={bindReduxAsyncConnect} history={browserHistory}>
        {getRoutes(context.store)}
      </Router>
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
    application: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired
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
