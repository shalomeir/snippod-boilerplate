import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { showLoginDialog } from 'ducks/application/application';
import { loadCommentsByPost, deleteComment } from 'ducks/posts/comments';

import { List, Comment, ConfirmCheckModal } from 'components';

const i18n = defineMessages({
  confirmCheckModalHeader: {
    id: 'comments.confirmCheckModalHeader',
    defaultMessage: 'Delete Comment'
  },

  confirmCheckModalDescription: {
    id: 'comments.confirmCheckModalDescription',
    defaultMessage: 'Are you sure you want to delete this comment?'
  },

  commentsIsNone: {
    id: 'comments.commentsIsNone',
    defaultMessage: 'There are no comments.'
  }

});

const styles = {
  commentContainer: {
    margin: '1em 0'
  },

  commentsList: {
    margin: 'auto'
  },

  confirmIcon: {
    width: '5rem'
  },

};

const mapStateToProps = createSelector([
  state => state.auth,
  state => state.entities.comments,
  state => state.postings.commentsByPost,
  (state, props) => props.post.id
], (auth, comments, commentsByPost, postId) => {
  const commentsByPostPagination = commentsByPost[postId] || { ids: [] };
  const commentsByPostList = commentsByPostPagination.ids.map(id => comments[id]);
  return {
    auth,
    commentsByPostPagination,
    commentsByPostList
  };
});

@connect(
  mapStateToProps,
  { loadCommentsByPost, deleteComment, showLoginDialog }
)
@injectIntl
@Radium
export default class Comments extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,

    post: PropTypes.object.isRequired,
    commentsByPostPagination: PropTypes.object.isRequired,
    commentsByPostList: PropTypes.array.isRequired,
    loadCommentsByPost: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = { showCheckModal: false };
    this.onShowCheckModal = this.onShowCheckModal.bind(this);
    this.onCloseCheckModal = this.onCloseCheckModal.bind(this);
    this.onConfirmCheckModal = this.onConfirmCheckModal.bind(this);
    this._loadCommentsByPost = this._loadCommentsByPost.bind(this);
    this._handleLoadMoreClick = this._handleLoadMoreClick.bind(this);
    this.renderComment = this.renderComment.bind(this);
  }

  componentWillMount() {
    this._loadCommentsByPost(this.props.post.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post.id !== nextProps.post.id) {
      this._loadCommentsByPost(nextProps.post.id);
    } else if (!nextProps.commentsByPostPagination.isFetching &&
      this.props.commentsByPostPagination !== nextProps.commentsByPostPagination &&
      !nextProps.commentsByPostPagination.pageCount) {
      this._loadCommentsByPost(nextProps.post.id);
    }
  }

  onShowCheckModal(checkedCommentId) {
    this.setState({
      showCheckModal: true,
      checkedCommentId
    });
  }

  onCloseCheckModal() {
    this.setState({
      showCheckModal: false,
      checkedCommentId: null
    });
  }

  onConfirmCheckModal() {
    const deletedCommentId = this.state.checkedCommentId;
    this.props.deleteComment(deletedCommentId);
  }

  _loadCommentsByPost(commentId, nextPage) {
    this.props.loadCommentsByPost(commentId, nextPage);
  }

  _handleLoadMoreClick() {
    this._loadCommentsByPost(this.props.post.id, true);
  }

  renderComment(comment) {
    const { intl, auth } = this.props;
    if (comment.deleted) return null;

    return (
      <div key={comment.id} className="ui comments" style={styles.commentContainer}>
        <Comment comment={comment}
                 intl={intl}
                 auth={auth}
                 showLoginDialog={this.props.showLoginDialog}
                 showConfirmCheckModal={this.onShowCheckModal}/>
      </div>
    );
  }

  render() {
    const { post, commentsByPostPagination, commentsByPostList,
      intl: { formatMessage } } = this.props;

    const confirmCheckModalIconCom = (
      <i className="remove circle outline icon" style={styles.confirmIcon} />
    );

    return (
      <div className="comment-list">
        <List renderItem={this.renderComment}
              items={commentsByPostList}
              onLoadMoreClick={this._handleLoadMoreClick}
              nothingText={formatMessage(i18n.commentsIsNone)}
              {...commentsByPostPagination} />
        <ConfirmCheckModal key="comments-comment-delete-confirm-check-modal"
                           id="comments-comment-delete-confirm-check-modal"
                           showOn={this.state.showCheckModal}
                           header={formatMessage(i18n.confirmCheckModalHeader)}
                           description={formatMessage(i18n.confirmCheckModalDescription)}
                           iconDom={confirmCheckModalIconCom}
                           onClose={this.onCloseCheckModal}
                           onConfirm={this.onConfirmCheckModal}/>
      </div>
    );
  }
}
