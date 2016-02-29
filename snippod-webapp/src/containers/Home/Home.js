import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { defineMessages, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';
import IntroCard from './IntroCard/IntroCard';
import { PostsHeader } from 'containers';

const styles = require('./HomeStyles');

const i18n = defineMessages({
  helloWorld: {
    id: 'home.helloWorld',
    defaultMessage: 'Hello guys'
  }
});

@connect(
  createSelector([
    state => state.auth
  ], (auth) => {
    return { auth };
  })
)
@Radium
export default class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="home ui text container main-container">
        <Helmet title="Home"/>
        <IntroCard />
        { /*<PostComposer {...this.props} /> */ }
        <PostsHeader />
        { /*<Posts {...this.props} />*/ }
      </div>
    );
  }
}
