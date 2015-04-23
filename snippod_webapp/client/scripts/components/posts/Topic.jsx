/**
*   Topic Component Description
*/

'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),
    Router = require('react-router'),

    //components
    TopicCard = require('./topicCard.jsx'),
    Posts = require('./posts.jsx'),
    ComposerBox = require('./ComposerBox.jsx'),
    //actions
    postActions = require('../../actions/posts/PostActions');

var Topic = React.createClass({

  mixins: [
    PureRenderMixin,
    Router.Navigation,
  ],

  statics: {
    willTransitionTo: function(transition, params) {
      postActions.listenToPosts(+params.pageNum || 1);
    },
    willTransitionFrom: function() {
      postActions.stopListeningToPosts();
    }
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <DocumentTitle title='Topic title'>
        <div className="topic main-container content full-width">
          <TopicCard/>
          <ComposerBox {...this.props} />
          <h3>And posts list</h3>
          <Posts {...this.props} />
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  }

});

module.exports = Topic;
