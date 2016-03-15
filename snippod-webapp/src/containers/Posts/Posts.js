import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { showLoginDialog, showRegisterDialog, redirectReplacePath } from 'ducks/application/application';
import { loadPosts, deletePost } from 'ducks/postings/posts';

import { List, Post, ConfirmCheckModal } from 'components';

const radiumStyles = require('theme/RadiumStyles');

const styles = {
  container: {
    marginTop: '1em',
    marginBottom: '1em'
  },

  postsList: {
    margin: 'auto'
  },

  confirmIcon: {
  },

};

const i18n = defineMessages({
  confirmCheckModalHeader: {
    id: 'posts.confirmCheckModalHeader',
    defaultMessage: 'Delete Post'
  },

  confirmCheckModalDescription: {
    id: 'posts.confirmCheckModalDescription',
    defaultMessage: 'Are you sure you want to delete this post?'
  },

});

const mapStateToProps = createSelector([
  state => state.auth,
  state => state.entities.posts,
  (state, props) => {
    const postingsByType = state.postings[props.type];
    if (postingsByType && postingsByType[props.option]) {
      return postingsByType[props.option];
    }
    return { ids: [] };
  }
], (auth, posts, postsPagination) => {
  const postsPaginationList = postsPagination.ids.map(id => posts[id]);
  return {
    auth,
    postsPagination,
    postsPaginationList
  };
});

@connect(
  mapStateToProps,
  { loadPosts, deletePost, showLoginDialog }
)
@injectIntl
@Radium
export default class Posts extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    option: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    postsPagination: PropTypes.object.isRequired,
    postsPaginationList: PropTypes.array.isRequired,
    loadPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = { showCheckModal: false };
    this.onShowCheckModal = this.onShowCheckModal.bind(this);
    this.onCloseCheckModal = this.onCloseCheckModal.bind(this);
    this.onConfirmCheckModal = this.onConfirmCheckModal.bind(this);
    this._loadPosts = this._loadPosts.bind(this);
    this._handleLoadMoreClick = this._handleLoadMoreClick.bind(this);
    this.renderPost = this.renderPost.bind(this);
  }

  componentWillMount() {
    this._loadPosts(this.props.type, this.props.option);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.option !== nextProps.option || this.props.type !== nextProps.type) {
      this._loadPosts(nextProps.type, nextProps.option);
    } else if (!nextProps.postsPagination.isFetching &&
      this.props.postsPagination !== nextProps.postsPagination &&
      !nextProps.postsPagination.pageCount) {
      this._loadPosts(nextProps.type, nextProps.option);
    }
  }

  onShowCheckModal(checkedPostId) {
    this.setState({
      showCheckModal: true,
      checkedPostId
    });
  }

  onCloseCheckModal() {
    this.setState({
      showCheckModal: false,
      checkedPostId: null
    });
  }

  onConfirmCheckModal() {
    const deletePostId = this.state.checkedPostId;
    this.props.deletePost(deletePostId);
  }

  _loadPosts(type, option, nextPage) {
    this.props.loadPosts(type, option, nextPage);
  }

  _handleLoadMoreClick() {
    this._loadPosts(this.props.type, this.props.option, true);
  }

  renderPost(post) {
    const { auth, type, option } = this.props;
    if (post.deleted) return null;

    return (
      <div key={type + '-' + option + '-' + post.id} className="ui container"
           style={[radiumStyles.listMargin, radiumStyles.fullWidth]}>
        <Post post={post}
              auth={auth}
              showLoginDialog={this.props.showLoginDialog}
              showConfirmCheckModal={this.onShowCheckModal}/>
      </div>
    );
  }

  render() {
    const { postsPagination, postsPaginationList,
      intl: { formatMessage } } = this.props;

    const confirmCheckModalIconCom = (
      <i className="remove circle outline icon" style={styles.confirmIcon} />
    );

    return (
      <div className="posts ui container">
        <List className="one cards"
              renderItem={this.renderPost}
              items={postsPaginationList}
              onLoadMoreClick={this._handleLoadMoreClick}
              {...postsPagination} />
        <ConfirmCheckModal key="posts-post-delete-confirm-check-modal"
                           id="posts-post-delete-confirm-check-modal"
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
