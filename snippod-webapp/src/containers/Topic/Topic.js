import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  aboutThanks: {
    id: 'about.specialThanks',
    description: 'Thanks to Dan Abramov for the idea of Redux',
    defaultMessage: 'A special thanks to {link} ' +
    'for kicking out the idea of {redux}!'
  },
});

@connect(
    state => ({ auth: state.auth })
)
export default class Topic extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };


  render() {
    const link = (<Link to="/stargazers/gaearon"><code>@gaearon</code></Link>);
    const redux = (<code>Redux</code>);

    return (
      <div className="topic container">
        <Helmet title="Main Page"/>

        <div className="topic main-container content full-width">
          { /*<TopicCard/>*/ }
          { /*<PostComposer {...this.props} /> */ }
          {this.props.auth.loggedIn ? (
            <h3 className="margin-bottom-0">로그인 했어요!!</h3>
          ) : (
            <h3 className="margin-bottom-0">로그인 부터 하시죠. admin@admin.com pw:admin</h3>
          )}
          <p>
            <FormattedMessage {...messages.aboutThanks}
              values={{ link, redux }} />
          </p>
          { /*<Posts {...this.props} />*/ }
        </div>
      </div>
    );
  }
}
