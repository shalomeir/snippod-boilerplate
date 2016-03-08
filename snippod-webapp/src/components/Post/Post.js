import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import $ from 'jquery';
import moment from 'moment';
import { shortenString } from 'utils/handleString';
import { checkAuth } from 'helpers/authChecker';
import { getHostPathFromUrl } from 'utils/transformUrl';
import classNames from 'classnames';
import { intlShape, defineMessages } from 'react-intl';

import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);
import { UpvoteButton } from 'components';

import { upvotePost, cancelUpvotePost } from 'ducks/posts/posts';
import { logoutAndFollow } from 'ducks/authentication/auth';

const styles = require('./PostStyles');

const i18n = defineMessages({
  comments: {
    id: 'comp.post.comments',
    defaultMessage: '{commentCount, plural, =0 {no comment} =1 {one comment} other {# comments}}'
  }
});

@connect(
  null,
  { upvotePost, cancelUpvotePost }
)
@Radium
export default class Post extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,

    post: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,

    upvotePost: PropTypes.func.isRequired,
    cancelUpvotePost: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.checkAndUpvotePost = this.checkAndUpvotePost.bind(this);
    this.checkAndCancelUpvotePost = this.checkAndCancelUpvotePost.bind(this);
  }

  checkAndUpvotePost(postId) {
    if (!checkAuth(this.props.auth, this.props.showLoginDialog)) {
      return Promise.reject('Login first');
    }
    return this.props.upvotePost(postId);
  }

  checkAndCancelUpvotePost(postId) {
    if (!checkAuth(this.props.auth, this.props.showLoginDialog)) {
      return Promise.reject('Login first');
    }
    return this.props.cancelUpvotePost(postId);
  }

  render() {
    const { post, intl: { formatMessage, locale } } = this.props;
    const postLink = getHostPathFromUrl(post.link);

    return (
      <div className="ui centered card" style={styles.card}>
        <div className="content">
          <div className="header" style={styles.title}>
            {post.title}
          </div>
        </div>
        <div className="content" style={styles.mainContent}>
          <div className="link-button ui center aligned container" style={styles.linkButtonContainer}>
            <a className="ui labeled icon blue basic button"
               href={post.link} target="_blank" style={styles.linkButton}>
              <i className="linkify icon" />
              {shortenString(postLink, 29)}
              {postLink.length > 29 ? (<span className="after-gradient-effect" />) : null}
            </a>
          </div>
          <div className="user">
            <i className="user icon" />{post.author.username}
          </div>
          <div className="meta" style={styles.meta}>
            {moment(post.createdAt).locale(locale).fromNow()}
          </div>
        </div>
        <div className="extra-infos extra content" style={styles.extraInfos}>
          <UpvoteButton
            node={post}
            onUpvoteClick={this.checkAndUpvotePost}
            onCancelUpvoteClick={this.checkAndCancelUpvotePost} />
          &nbsp;&nbsp;
          <span className="right floated comment-info">
            <i className="comment icon"></i>
            {formatMessage(i18n.comments, { commentCount: post.commentCount })}
          </span>
        </div>
      </div>
    );
  }
}
