/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var React = require('react'),
    { PropTypes } = React,
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    Link = require('react-router').Link,
    // actions
    PostsActions = require('../../../../actions/posts/PostsActions'),
    // components
    Upvote = require('./upvote/Upvote.jsx');

var Post = React.createClass({

  mixins: [
    PureRenderMixin,
    require('../../../mixins/pluralize'),
    require('../../../mixins/abbreviateNumber'),
    require('../../../mixins/hostNameFromUrl'),
    require('../../../mixins/timeAgo')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post : PropTypes.object.isRequired
  },

  render: function() {
    var account = this.props.account;
    var post = this.props.post;
    var commentCount = post.commentCount;
    var deleteOption = '';

    if (post.isDeleted) {
      // post doesn't exist
      return (
        /* jshint ignore:start */
        <div className="post cf">
          <div className="post-link">
            [deleted]
          </div>
        </div>
        /* jshint ignore:end */
      );
    }

    // add delete option if creator is logged in
    if (post.isAuthorMe) {
      deleteOption = (
        /* jshint ignore:start */
        <span className="delete post-info-item">
          <a onClick={ PostsActions.deletePost.bind(this, post.id) }>delete</a>
        </span>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div className="post">
        <div className="post-link">
          <Link to="singlePost" params={{ postId: post.id }}
                className="post-title" >{ post.title }</Link>
          <span className="hostname">
            (<a href={ post.link } target="_blank">{ this.hostnameFromUrl(post.link) }</a>)
          </span>
        </div>
        <div className="post-info">
          <div className="posted-by">
            <Upvote { ...this.props} />
            <span className="post-info-item">
              <span to="profile" params={{ user: post.author.id }}>
                { post.author.username }</span>
            </span>
            <span className="post-info-item">
                            { this.timeAgo(post.createdAt) }
            </span>
            <span className="post-info-item">
              <Link to="singlePost" params={{ postId: post.id }}>
                { this.pluralize(commentCount, 'comment') }
              </Link>
            </span>
            { deleteOption }
          </div>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Post;
