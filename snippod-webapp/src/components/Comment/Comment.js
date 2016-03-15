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
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);
import { UpvoteButton } from 'components';

import { upvoteComment, cancelUpvoteComment } from 'ducks/postings/comments';

const styles = require('./CommentStyles');

const i18n = defineMessages({
  deleteComment: {
    id: 'comp.comment.deleteComment',
    defaultMessage: 'delete'
  },
});

@connect(
  null,
  { upvoteComment, cancelUpvoteComment }
)
@injectIntl
@Radium
export default class Comment extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showConfirmCheckModal: PropTypes.func.isRequired,

    comment: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,

    upvoteComment: PropTypes.func.isRequired,
    cancelUpvoteComment: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.checkAndUpvoteComment = this.checkAndUpvoteComment.bind(this);
    this.checkAndCancelUpvoteComment = this.checkAndCancelUpvoteComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  checkAndUpvoteComment(commentId) {
    if (!checkAuth(this.props.auth, this.props.showLoginDialog)) {
      return Promise.resolve('Login first');
    }
    return this.props.upvoteComment(commentId);
  }

  checkAndCancelUpvoteComment(commentId) {
    if (!checkAuth(this.props.auth, this.props.showLoginDialog)) {
      return Promise.resolve('Login first');
    }
    return this.props.cancelUpvoteComment(commentId);
  }

  deleteComment(event) {
    event.preventDefault();
    this.props.showConfirmCheckModal(this.props.comment.id);
  }

  render() {
    const { comment, intl: { formatMessage, locale } } = this.props;

    const meLabel = (
      <div className="ui animated fade tiny compact basic button" type="button"
           onClick={this.deleteComment} style={styles.meLabel}>
        <span className="visible content" style={styles.meLabelContent}>
          Me
        </span>
        <span className="hidden content" style={styles.meLabelHiddenContent}>
          {formatMessage(i18n.deleteComment)}
        </span>
        <i className="delete icon"/>
      </div>
    );

    return (
      <div className="comment">
        <Link className="avatar" to={'/user/' + comment.author.id}>
          <i className="user circular inverted blue user small icon" />
        </Link>
        <div className="content" style={styles.mainContent}>
          <Link to={'/user/' + comment.author.id} className="author" style={styles.authorName}>{shortenString(comment.author.username, 12)}</Link>
          <div className="metadata">
            <div className="meta date" style={styles.meta}>
              {moment(comment.createdAt).locale(locale).fromNow()}
            </div>
            <UpvoteButton
              style={styles.upvoteButton}
              node={comment}
              onUpvoteClick={this.checkAndUpvoteComment}
              onCancelUpvoteClick={this.checkAndCancelUpvoteComment} />
            {comment.isAuthorMe ? meLabel : null}
          </div>
          <div className="text">
            {shortenString(comment.content, 100)}
            {comment.content > 100 ? (<span className="after-gradient-effect" />) : null}
          </div>
        </div>
      </div>
    );
  }
}
