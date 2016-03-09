import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import $ from 'jquery';
import { shortenString } from 'utils/handleString';

import { showLoginDialog } from 'ducks/application/application';
import { fetchPost, deletePost } from 'ducks/posts/posts';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { Comments, CommentComposer } from 'containers';
import { List, Post, ConfirmCheckModal } from 'components';

const radiumStyles = require('theme/RadiumStyles');

const styles = {
  confirmIcon: {
    width: '5rem'
  },

  loader: {
    marginTop: '3rem'
  },

  zIndexUp: {
    zIndex: 3
  },

  commentsCardContainer: {
    top: '-24px',
    margin: 'auto',
    maxWidth: '490px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '1.2em 1em 2em 1em',
  }
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

  nothingHere: {
    id: 'singlePost.nothingHere',
    defaultMessage: 'Nothing here'
  },

  nothing: {
    id: 'comp.list.nothing',
    defaultMessage: 'Nothing here!'
  }

});

const mapStateToProps = createSelector([
  state => state.auth,
  state => state.entities.posts,
  (state, props) => props.params
], (auth, posts, params) => {
  const post = params && posts[params.postId] ? posts[params.postId] : null;
  return { auth, post };
});

@connect(
  mapStateToProps,
  { fetchPost, deletePost, showLoginDialog }
)
@injectIntl
@Radium
export default class SinglePost extends Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object,
    params: PropTypes.object.isRequired,
    showLoginDialog: PropTypes.func.isRequired,

    fetchPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      isFetching: false,
      showCheckModal: false
    };
    this.onShowCheckModal = this.onShowCheckModal.bind(this);
    this.onCloseCheckModal = this.onCloseCheckModal.bind(this);
    this.onConfirmCheckModal = this.onConfirmCheckModal.bind(this);
    this.loadPost = this.loadPost.bind(this);
    this.renderPost = this.renderPost.bind(this);
  }

  componentWillMount() {
    this.loadPost(this.props.params.postId);
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

  onFocusInput() {
    $('input').focus();
  }

  loadPost(postId) {
    const loadPostPromise = this.props.fetchPost(postId);
    if (loadPostPromise) {
      this.setState({ isFetching: true });
      loadPostPromise
        .then((response) => {
          this.setState({ isFetching: false });
        })
        .catch((error) => {
          this.setState({ isFetching: false });
        })
      ;
    }
  }

  renderPost(post) {
    const { intl, auth } = this.props;

    return (
      <Post key={post.id}
            style={styles.zIndexUp}
            post={post}
            intl={intl}
            auth={auth}
            showLoginDialog={this.props.showLoginDialog}
            showConfirmCheckModal={this.onShowCheckModal}
            onCommentsButton={this.onFocusInput}/>
    );
  }

  render() {
    const { post, auth, intl: { formatMessage } } = this.props;
    const { isFetching } = this.state;

    const postTitle = post && !post.deleted ? post.title : formatMessage(i18n.nothingHere);

    let tempDom;
    const isEmpty = !post || post.deleted;
    if (isFetching && isEmpty) {
      tempDom = (<div className="ui active centered inline loader" style={styles.loader}></div>);
    }
    if (!isFetching && isEmpty) {
      tempDom = (<h3 style={radiumStyles.center}><i className="frown icon" />{formatMessage(i18n.nothing)}</h3>);
    }

    const confirmCheckModalIconCom = (
      <i className="remove circle outline icon" style={styles.confirmIcon} />
    );

    const postDom = post ? (
      <div>
        {this.renderPost(post)}
        <div className="comment-list ui card" style={styles.commentsCardContainer}>
          <CommentComposer postId={post.id} auth={auth} style={styles.commentComposer} loadPost={this.loadPost}/>
          <Comments post={post} />
        </div>
        <ConfirmCheckModal key="singlepost-delete-confirm-check-modal"
                           id="singlepost-delete-confirm-check-modal"
                           showOn={this.state.showCheckModal}
                           header={formatMessage(i18n.confirmCheckModalHeader)}
                           description={formatMessage(i18n.confirmCheckModalDescription)}
                           iconDom={confirmCheckModalIconCom}
                           onClose={this.onCloseCheckModal}
                           onConfirm={this.onConfirmCheckModal}/>
      </div>
    ) : null;

    return (
      <div className="single-post ui text container main-container">
        <Helmet title={shortenString(postTitle, 17)}/>
        {isEmpty ? tempDom : postDom}
      </div>
    );
  }
}
