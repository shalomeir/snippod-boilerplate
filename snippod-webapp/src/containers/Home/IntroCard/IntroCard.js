import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import classNames from 'classnames';

import { defineMessages, FormattedMessage } from 'react-intl';

const radiumStyles = require('theme/RadiumStyles');
import semanticVar from 'theme/semantic-variables';
const styles = {
  helloText: {
    fontWeight: 400
  },
  subText: {
    color: semanticVar['@invertedTextColor']
  }
};

const i18n = defineMessages({
  helloSnippod: {
    id: 'home.introCard.helloSnippod',
    defaultMessage: 'Welcome to Snippod\'s Boilerplate Demo Application!'
  },

  helloSnippodSubText: {
    id: 'home.introCard.helloSnippodSubText',
    defaultMessage: 'This full stack demo app is developed using {djangoRestFramework}' +
      ' and {react} + {redux}. Take a look at the {gitHubEn}.'
  }
});

@Radium
export default class IntroCard extends Component {
  static propTypes = {
    style: PropTypes.object
  };

  render() {
    const { style } = this.props;

    const djangoRestFramework = (<a href="http://www.django-rest-framework.org/" target="_blank">django REST framework</a>);
    const react = (<a href="https://facebook.github.io/react/index.html" target="_blank">React</a>);
    const redux = (<a href="http://redux.js.org/" target="_blank">Redux</a>);
    const gitHubEn = (<a href="https://github.com/shalomeir/snippod-boilerplate" target="_blank">github repository</a>);
    const gitHubKr = (<a href="https://github.com/shalomeir/snippod-boilerplate" target="_blank">깃허브 저장소</a>);

    return (
      <div className="intro-card ui secondary inverted blue very padded
       text container segment center aligned" style={[radiumStyles.cardBoxShadow, style]}>
        <h2 style={styles.helloText}><FormattedMessage {...i18n.helloSnippod}/></h2>
        <p style={styles.subText}>
          <FormattedMessage {...i18n.helloSnippodSubText}
            values={{ djangoRestFramework, react, redux, gitHubEn, gitHubKr }}/>
        </p>
      </div>
    );
  }
}
