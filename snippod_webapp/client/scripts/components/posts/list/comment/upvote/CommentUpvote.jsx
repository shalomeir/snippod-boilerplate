'use strict';

var React = require('react'),
    { PropTypes } = React,
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    cx = require('classnames'),
    throttle = require('lodash/function/throttle'),
    // actions
    PostsActions = require('../../../../../actions/posts/PostsActions'),
    UIActions =require('../../../../../actions/commons/UIActions');

var CommentUpvote = React.createClass({

  mixins:[PureRenderMixin],

  propTypes: {
    auth: PropTypes.object.isRequired,
    comment : PropTypes.object.isRequired
  },

  upvoteClick: throttle(function(commentId) {
    if (!this.props.auth.loggedIn) {
      UIActions.showOverlay('login');
      return;
    }

    if (this.props.comment.isUpvotedMe) {
      PostsActions.cancelUpvoteComment(commentId);
    } else {
      PostsActions.upvoteComment(commentId);
    }

  }, 300, { trailing: false }),

  render: function() {

    var commentId = this.props.comment.id;
    var upvoteCount = this.props.comment.upvoteCount;

    var upvoted = this.props.comment.isUpvotedMe;
    var upvoteCx = cx({
      'upvote': true,
      'upvoted': upvoted
    });

    return (
      /* jshint ignore:start */
      <a className={ upvoteCx } onClick={ this.upvoteClick.bind(this, commentId) } disabled={ upvoted }>
        { upvoteCount } <i className="fa fa-arrow-up"></i>
      </a>
      /* jshint ignore:end */

    );
  }

});

module.exports = CommentUpvote;
