/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var React = require('react'),
    // actions
    postActions = require('../../../actions/postActions'),
    // components
    Upvote = require('./upvote.jsx');

var Post = React.createClass({

  mixins: [
    require('../../mixins/pluralize'),
    require('../../mixins/abbreviateNumber'),
    require('../../mixins/hostnameFromUrl'),
    require('../../mixins/timeAgo')
  ],

  render: function() {
    var user = this.props.user;
    var post = this.props.post;
    var commentCount = post.commentCount || 0;
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
    if (user.uid === post.creatorUID) {
      deleteOption = (
        <span className="delete post-info-item">
          <a onClick={ postActions.deletePost.bind(this, post.id) }>delete</a>
        </span>
      );
    }

    var upvoteActions = {
      upvote: postActions.upvotePost,
      downvote: postActions.downvotePost
    };

    return (
      /* jshint ignore:start */
      <div className="post">
        <div className="post-link">
          <a className="post-title" href={ post.url }>{ post.title }</a>
          <span className="hostname">
            (<a href={ post.url }>{ this.hostnameFromUrl(post.url) }</a>)
          </span>
        </div>
        <div className="post-info">
          <div className="posted-by">
            <Upvote
              upvoteActions= { upvoteActions }
              user={ user }
              itemId={ post.id }
              upvotes={ post.upvotes ? this.abbreviateNumber(post.upvotes) : 0 } />
            <span className="post-info-item">
              <span to="profile" params={{ username: post.creator }}>{ post.creator }</span>
            </span>
            <span className="post-info-item">
                            { this.timeAgo(post.time) }
            </span>
            <span className="post-info-item">
              <span to="post" params={{ postId: post.id }}>
                { this.pluralize(commentCount, 'comment') }
              </span>
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
