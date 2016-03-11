import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { defineMessages, FormattedMessage } from 'react-intl';

const styles = require('./FooterStyles');

const i18n = defineMessages({
  footerMessage: {
    id: 'layout.footer.footerMessage',
    defaultMessage: 'This is a open source application. Go to the repository on {repoGitLink}.'
  },
});

@connect(
  null
)
@Radium
export default class Footer extends Component {

  render() {
    const repoGitLink = (<a href="https://github.com/shalomeir/snippod-boilerplate" target="_blank">Github</a>);
    const githubButton = (<iframe src="https://ghbtns.com/github-btn.html?user=shalomeir&repo=snippod-boilerplate&type=star&count=true" frameBorder="0" scrolling="0" width="90px" height="20px"
                                  style={styles.githubButton} key="github-iframe-button"/>);

    return (
      <footer id="footer" className="layout ui footer inverted vertical segment" style={styles.layout} key="footer">
        <div className="ui center aligned container">
          <img src="/images/logo.png" className="ui centered mini image" />
          <div className="ui horizontal inverted small list" style={styles.lineHeight}>
            <FormattedMessage {...i18n.footerMessage} values={{ repoGitLink }}/>
            &nbsp; &nbsp; {githubButton}
          </div>
        </div>
      </footer>
    );
  }
}
