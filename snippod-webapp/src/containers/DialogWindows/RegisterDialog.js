import React, {Component} from 'react';
import Helmet from 'react-helmet';
import head from 'constants/head';

const meta = { ...head,
  title: 'Snippod boilerplate Main Page'
};

export default class RegisterDialog extends Component {

  render() {
    return (
      <div className="container">
        <Helmet {...meta}/>

        <div className="topic main-container content full-width">
          { /*<TopicCard/>*/ }
          { /*<PostComposer {...this.props} /> */ }
          <h3 className="margin-bottom-0"> register modal </h3>
          { /*<Posts {...this.props} />*/ }
        </div>
      </div>
    );
  }
}
