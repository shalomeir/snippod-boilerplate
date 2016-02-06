/**
 * THIS IS THE React web app ENTRY POINT.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ReduxRouter, replaceState } from 'redux-router';
import { IntlProvider } from 'react-intl';
import * as i18n from './i18n';

import getRoutes from './routes';
import { getQueryParameters } from 'utils/handleString';

function getRootChildren(props, context) {
  const lang = props.application.lang;
  const intlData = {
    lang,
    messages: i18n[lang]
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
    state => state.application,
  ], (application) => {
    return { application };
  }),
  { replaceState }
)
export default class Root extends Component {

  static propTypes = {
    application: PropTypes.object.isRequired,
    replaceState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (window.location) {
      this.props.replaceState(null, window.location.pathname,
        Object.assign({ language: this.props.application.lang }, getQueryParameters(window.location.search))
      );
    }
  }

  render() {
    return (
      <div>{getRootChildren(this.props, this.context)}</div>
    );
  }
}
