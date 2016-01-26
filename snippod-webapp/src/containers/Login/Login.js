import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Topic extends Component {

  render() {
    return (
      <div className="login container">
        <Helmet title="Login Page"/>

        <div className="topic main-container content full-width">
          { /*<TopicCard/>*/ }
          { /*<PostComposer {...this.props} /> */ }
          <h3 className="margin-bottom-0">로그인 하세요.</h3>
          { /*<Posts {...this.props} />*/ }
        </div>
      </div>
    );
  }
}
