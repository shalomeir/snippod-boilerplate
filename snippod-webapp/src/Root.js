/**
 * THIS IS THE React web app ENTRY POINT.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { IntlProvider } from 'react-intl';
import * as i18n from './i18n';

import getRoutes from './routes';

function getRootChildren(rootProps, routes) {
  const intlData = {
    locale: rootProps.application.lang,
    messages: i18n[rootProps.application.lang]
  };
  const { client } = rootProps;
  const bindReduxAsyncConnect = (props) =>
    <ReduxAsyncConnect {...props} helpers={{ client }} />;

  const rootChildren = [
    <IntlProvider key="intl" {...intlData}>
      <Router render={bindReduxAsyncConnect} history={browserHistory} routes={routes} />
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

  //This step make a routes as a constant. This is a solution that a IntlProvider refresh Router routes.
  // about issue: https://github.com/rackt/react-router/issues/2704
  componentWillMount() {
    this.setState({
      routes: getRoutes(this.context.store)
    });
  }

  render() {

    return (
      <div id="root">{getRootChildren(this.props, this.state.routes)}</div>
    );
  }
}
