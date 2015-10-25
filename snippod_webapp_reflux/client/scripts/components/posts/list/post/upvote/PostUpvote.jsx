'use strict';

var React = require('react'),
    { PropTypes } = React,
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    cx = require('classnames'),
    throttle = require('lodash/function/throttle'),
    // actions
    PostsActions = require('../../../../../actions/posts/PostsActions'),
    UIActions =require('../../../../../actions/commons/UIActions');

var PostUpvote = React.createClass({

  mixins:[PureRenderMixin],

  propTypes: {
    auth: PropTypes.object.isRequired,
    post : PropTypes.object.isRequired
  },

  upvoteClick: throttle(function(postId) {
    if (!this.props.auth.loggedIn) {
      UIActions.showOverlay('login');
      return;
    }

    if (this.props.post.isUpvotedMe) {
      PostsActions.cancelUpvotePost(postId);
    } else {
      PostsActions.upvotePost(postId);
    }

  }, 300, { trailing: false }),

  render: function() {

    var postId = this.props.post.id;
    var upvoteCount = this.props.post.upvoteCount;

    var upvoted = this.props.post.isUpvotedMe;
    var upvoteCx = cx({
      'upvote': true,
      'upvoted': upvoted
    });

    return (
      /* jshint ignore:start */
      <a className={ upvoteCx } onClick={ this.upvoteClick.bind(this, postId) } disabled={ upvoted }>
        { upvoteCount } <i className="fa fa-arrow-up"></i>
      </a>
      /* jshint ignore:end */

    );
  }

});

module.exports = PostUpvote;
