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
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);
import { UpvoteButton } from 'components';

import { upvotePost, cancelUpvotePost } from 'ducks/postings/posts';

const styles = require('./PostStyles');

const i18n = defineMessages({
  comments: {
    id: 'comp.post.comments',
    defaultMessage: '{commentCount, plural, =0 {no comment} =1 {one comment} other {# comments}}'
  },
  deletePost: {
    id: 'comp.post.deletePost',
    defaultMessage: 'delete'
  },
});

@connect(
  null,
  { upvotePost, cancelUpvotePost }
)
@injectIntl
@Radium
export default class Post extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showConfirmCheckModal: PropTypes.func.isRequired,
    onCommentsButton: PropTypes.func,
    disabledSelfLink: PropTypes.bool,

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
    this.deletePost = this.deletePost.bind(this);
  }

  checkAndUpvotePost(postId) {
    if (!checkAuth(this.props.auth, this.props.showLoginDialog)) {
      return Promise.resolve('Login first');
    }
    return this.props.upvotePost(postId);
  }

  checkAndCancelUpvotePost(postId) {
    if (!checkAuth(this.props.auth, this.props.showLoginDialog)) {
      return Promise.resolve('Login first');
    }
    return this.props.cancelUpvotePost(postId);
  }

  deletePost(event) {
    event.preventDefault();
    this.props.showConfirmCheckModal(this.props.post.id);
  }

  render() {
    const { post, intl: { formatMessage, locale }, style, disabledSelfLink } = this.props;
    const postLink = getHostPathFromUrl(post.link);

    const meLabel = (
      <div className="ui top right attached animated fade button label" type="button"
           onClick={this.deletePost} style={styles.meLabel}>
        <span className="visible content" style={styles.meLabelContent}>
          Me
        </span>
        <span className="hidden content" style={styles.meLabelHiddenContent}>
          {formatMessage(i18n.deletePost)}
        </span>
        <i className="delete icon" style={styles.deleteIcon} />
      </div>
    );

    const singlePostLocation = {
      pathname: '/post/' + post.id,
      state: { modal: true }
    };

    return (
      <div className="ui centered card" style={[styles.card, style]}>
        <Link className="content" to={singlePostLocation} style={styles.cardHeader} disabled={disabledSelfLink}>
          {post.isAuthorMe ? meLabel : null}
          <div className="header" style={styles.title}>
            {shortenString(post.title, 44)}
            {post.title.length > 44 ? (<span className="after-gradient-effect" />) : null}
          </div>
        </Link>
        <div className="content" style={styles.mainContent}>
          <div className="link-button ui center aligned container" style={styles.linkButtonContainer}>
            <a className="ui labeled icon blue basic button"
               href={post.link} target="_blank" style={styles.linkButton}>
              <i className="linkify icon" />
              {shortenString(postLink, 29)}
              {postLink.length > 29 ? (<span className="after-gradient-effect" />) : null}
            </a>
          </div>
          <Link className="user" to={'/user/' + post.author.id}>
            <i className="user circular inverted blue user small icon" />
            {shortenString(post.author.username, 13)}
          </Link>
          <div className="meta date" style={styles.meta}>
            {moment(post.createdAt).locale(locale).fromNow()}
          </div>
        </div>
        <div className="extra-infos extra content" style={styles.extraInfos}>
          <UpvoteButton
            node={post}
            onUpvoteClick={this.checkAndUpvotePost}
            onCancelUpvoteClick={this.checkAndCancelUpvotePost} />
          &nbsp;&nbsp;
          <Link className="right floated comment-info" to={singlePostLocation}
                onClick={this.props.onCommentsButton} disabled={disabledSelfLink}>
            <i className="comment icon" />
            <FormattedMessage {...i18n.comments} values={{ commentCount: post.commentCount }}/>
          </Link>
        </div>
      </div>
    );
  }
}
