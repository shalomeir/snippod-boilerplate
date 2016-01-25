import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import head from 'constants/head';

const meta = { ...head,
  title: 'Snippod boilerplate Main Page'
};

@connect(
    state => ({ auth: state.auth })
)
export default class Topic extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };


  render() {
    return (
      <div className="container">
        <Helmet {...meta}/>

        <div className="topic main-container content full-width">
          { /*<TopicCard/>*/ }
          { /*<PostComposer {...this.props} /> */ }
          {this.props.auth.loggedIn ? (
            <h3 className="margin-bottom-0">로그인 했어요!!</h3>
          ) : (
            <h3 className="margin-bottom-0">로그인 부터 하시죠. admin@admin.com pw:admin</h3>
          )}
          { /*<Posts {...this.props} />*/ }
        </div>
      </div>
    );
  }
}
