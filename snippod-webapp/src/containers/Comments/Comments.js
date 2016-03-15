import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { showLoginDialog } from 'ducks/application/application';
import { loadComments, deleteComment } from 'ducks/postings/comments';

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
  (state, props) => {
    const postingsByType = state.postings[props.type];
    if (postingsByType && postingsByType[props.option]) {
      return postingsByType[props.option];
    }
    return { ids: [] };
  }
], (auth, comments, commentsPagination) => {
  const commentsPaginationList = commentsPagination.ids.map(id => comments[id]);

  return {
    auth,
    commentsPagination,
    commentsPaginationList
  };
});

@connect(
  mapStateToProps,
  { loadComments, deleteComment, showLoginDialog }
)
@injectIntl
@Radium
export default class Comments extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    option: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    commentsPagination: PropTypes.object.isRequired,
    commentsPaginationList: PropTypes.array.isRequired,
    loadComments: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = { showCheckModal: false };
    this.onShowCheckModal = this.onShowCheckModal.bind(this);
    this.onCloseCheckModal = this.onCloseCheckModal.bind(this);
    this.onConfirmCheckModal = this.onConfirmCheckModal.bind(this);
    this._loadComments = this._loadComments.bind(this);
    this._handleLoadMoreClick = this._handleLoadMoreClick.bind(this);
    this.renderComment = this.renderComment.bind(this);
  }

  componentWillMount() {
    this._loadComments(this.props.type, this.props.option);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.option !== nextProps.option || this.props.type !== nextProps.type) {
      this._loadCommentsByPost(nextProps.type, nextProps.option);
    } else if (!nextProps.commentsPagination.isFetching &&
      this.props.commentsPagination !== nextProps.commentsPagination &&
      !nextProps.commentsPagination.pageCount) {
      this._loadComments(nextProps.type, nextProps.option);
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

  _loadComments(type, option, nextPage) {
    this.props.loadComments(type, option, nextPage);
  }

  _handleLoadMoreClick() {
    this._loadComments(this.props.type, this.props.option, true);
  }

  renderComment(comment) {
    const { auth } = this.props;
    if (comment.deleted) return null;

    return (
      <div key={comment.id} className="ui comments" style={styles.commentContainer}>
        <Comment comment={comment}
                 auth={auth}
                 showLoginDialog={this.props.showLoginDialog}
                 showConfirmCheckModal={this.onShowCheckModal}/>
      </div>
    );
  }

  render() {
    const { commentsPagination, commentsPaginationList,
      intl: { formatMessage } } = this.props;

    const confirmCheckModalIconCom = (
      <i className="remove circle outline icon" style={styles.confirmIcon} />
    );

    return (
      <div className="comment-list">
        <List renderItem={this.renderComment}
              items={commentsPaginationList}
              onLoadMoreClick={this._handleLoadMoreClick}
              nothingText={formatMessage(i18n.commentsIsNone)}
              {...commentsPagination} />
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
