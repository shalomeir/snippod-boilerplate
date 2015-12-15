import React, {Component} from 'react';
import Helmet from 'react-helmet';
import head from 'constants/head';

const meta = { ...head,
  title: 'Snippod boilerplate Login Page'
};

export default class Topic extends Component {

  render() {
    return (
      <div className="container">
        <Helmet {...meta}/>

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
