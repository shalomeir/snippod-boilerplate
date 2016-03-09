import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { showLoginDialog, showRegisterDialog, redirectReplacePath } from 'ducks/application/application';
import { loadPostsBySortingOption, deletePost } from 'ducks/posts/posts';

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
  state => state.postings.postsBySortingOption,
  (state, props) => props.sortingOption
], (auth, posts, postsBySortingOption, sortingOption) => {
  const postsBySortingOptionPagination = postsBySortingOption[sortingOption] || { ids: [] };
  const postsBySortingOptionList = postsBySortingOptionPagination.ids.map(id => posts[id]);
  return {
    auth,
    sortingOption,
    postsBySortingOptionPagination,
    postsBySortingOptionList
  };
});

@connect(
  mapStateToProps,
  { loadPostsBySortingOption, deletePost, showLoginDialog }
)
@injectIntl
@Radium
export default class Posts extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,

    sortingOption: PropTypes.string.isRequired,
    postsBySortingOptionPagination: PropTypes.object.isRequired,
    postsBySortingOptionList: PropTypes.array.isRequired,
    loadPostsBySortingOption: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = { showCheckModal: false };
    this.onShowCheckModal = this.onShowCheckModal.bind(this);
    this.onCloseCheckModal = this.onCloseCheckModal.bind(this);
    this.onConfirmCheckModal = this.onConfirmCheckModal.bind(this);
    this._loadPostsBySortingOption = this._loadPostsBySortingOption.bind(this);
    this._handleLoadMoreClick = this._handleLoadMoreClick.bind(this);
    this.renderPost = this.renderPost.bind(this);
  }

  componentWillMount() {
    this._loadPostsBySortingOption(this.props.sortingOption);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sortingOption !== nextProps.sortingOption) {
      this._loadPostsBySortingOption(nextProps.sortingOption);
    } else if (!nextProps.postsBySortingOptionPagination.isFetching &&
      this.props.postsBySortingOptionPagination !== nextProps.postsBySortingOptionPagination &&
      !nextProps.postsBySortingOptionPagination.pageCount) {
      this._loadPostsBySortingOption(nextProps.sortingOption);
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

  _loadPostsBySortingOption(sortingOption, nextPage) {
    this.props.loadPostsBySortingOption(sortingOption, nextPage);
  }

  _handleLoadMoreClick() {
    this._loadPostsBySortingOption(this.props.sortingOption, true);
  }

  renderPost(post) {
    const { intl, auth } = this.props;
    if (post.deleted) return null;

    return (
      <div key={post.id} className="ui container" style={[radiumStyles.listMargin, radiumStyles.fullWidth]}>
        <Post post={post}
              intl={intl}
              auth={auth}
              showLoginDialog={this.props.showLoginDialog}
              showConfirmCheckModal={this.onShowCheckModal}/>
      </div>
    );
  }

  render() {
    const { sortingOption, postsBySortingOptionPagination, postsBySortingOptionList,
      intl: { formatMessage } } = this.props;

    const confirmCheckModalIconCom = (
      <i className="remove circle outline icon" style={styles.confirmIcon} />
    );

    return (
      <div className="posts ui container">
        <List className="one cards"
              renderItem={this.renderPost}
              items={postsBySortingOptionList}
              onLoadMoreClick={this._handleLoadMoreClick}
              {...postsBySortingOptionPagination} />
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
