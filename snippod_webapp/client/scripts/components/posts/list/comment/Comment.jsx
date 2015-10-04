/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    Link = require('react-router').Link,
    // actions
    PostsActions = require('../../../../actions/posts/PostsActions'),
    // components
    CommentUpvote = require('./upvote/CommentUpvote.jsx'),
    //store
    PostStore = require('../../../../stores/posts/PostStore');

// This comment using PostStore for link to source post.
var Comment = React.createClass({

  mixins: [
    PureRenderMixin,
    Reflux.listenTo(PostStore, 'onPostUpdate'),

    require('../../../mixins/pluralize'),
    require('../../../mixins/abbreviateNumber'),
    require('../../../mixins/hostNameFromUrl'),
    require('../../../mixins/timeAgo')
  ],

  propTypes: {
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showPostTitle: PropTypes.bool.isRequired
  },

  getDefaultProps: function() {
    return {
      showPostTitle: false
    };
  },

  getInitialState: function() {
    var post = PostStore.get(this.props.comment.post);
    return {
      post: post
    };
  },

  componentDidMount: function() {
    if(typeof this.state.post === 'undefined' &&
      typeof this.props.comment.post !== 'undefined') {
      PostsActions.getPost(this.props.comment.post);
    }
  },

  onPostUpdate: function() {
    var post = PostStore.get(this.props.comment.post);
    this.setState({
      post: post
    });
    if(typeof this.state.post === 'undefined' &&
        typeof this.props.comment.post !== 'undefined') {
      PostsActions.getPost(this.props.comment.post);
    }
  },

  render: function() {
    var comment = this.props.comment;
    var post = this.state.post;
    var auth = this.props.auth;
    var deleteOption = '';
    var showPostTitle = this.props.showPostTitle;

    if (comment.isDeleted) {
      // post doesn't exist
      return (
        /* jshint ignore:start */
        <div className="comment cf">
          [deleted]
        </div>
        /* jshint ignore:end */
      );
    }

    // add delete option if creator is logged in
    if (comment.isAuthorMe) {
      deleteOption = (
        /* jshint ignore:start */
        <span className="delete post-info-item">
          <a onClick={ PostsActions.deleteComment.bind(this, comment.id) }>delete</a>
        </span>
        /* jshint ignore:end */
      );
    }

    var postLink = null;
    if (showPostTitle && typeof post !== 'undefined') {
      postLink = (
        /* jshint ignore:start */
        <span className="post-info-item">
          <Link to={`/post/${post.id}`}> { post.title } </Link>
        </span>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div className="comment cf">
        <div className="comment-text">
          { comment.content }
        </div>
        <div className="comment-info">
          <div className="posted-by float-left">
            <CommentUpvote comment = { comment } auth = { auth } />
            <span className="post-info-item">
              <Link to={`/user/${comment.author.id}`}>
                { comment.author.username } </Link>
            </span>
            <span className="post-info-item">
                { this.timeAgo(comment.createdAt) }
            </span>
            { postLink }
            { deleteOption }
          </div>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Comment;
