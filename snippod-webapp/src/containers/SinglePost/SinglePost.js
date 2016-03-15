import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import $ from 'jquery';
import classNames from 'classnames';
import { shortenString } from 'utils/handleString';

import { COMMENTS_BY_POST } from 'ducks/postings';
import { showLoginDialog } from 'ducks/application/application';
import { fetchPost, deletePost } from 'ducks/postings/posts';

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
    background: '#F5F5F5',
    padding: '1.2em 1em 2em 1em',
  }
};

const i18n = defineMessages({
  confirmCheckModalHeader: {
    id: 'singlePost.confirmCheckModalHeader',
    defaultMessage: 'Delete Post'
  },

  confirmCheckModalDescription: {
    id: 'singlePost.confirmCheckModalDescription',
    defaultMessage: 'Are you sure you want to delete this post?'
  },

  nothingHere: {
    id: 'singlePost.nothingHere',
    defaultMessage: 'Nothing here'
  },

  loading: {
    id: 'singlePost.loading',
    defaultMessage: 'Loading..'
  },

  nothing: {
    id: 'singlePost.nothing',
    defaultMessage: 'Nothing here!'
  }

});

const mapStateToProps = createSelector([
  state => state.auth,
  state => state.application.isShowModal,
  state => state.entities.posts,
  (state, props) => props.params
], (auth, isShowModal, posts, params) => {
  const post = params && posts[params.postId] ? posts[params.postId] : null;
  return { auth, isShowModal, post };
});

@connect(
  mapStateToProps,
  { fetchPost, deletePost, showLoginDialog }
)
@injectIntl
@Radium
export default class SinglePost extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    isShowModal: PropTypes.bool.isRequired,
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
    const { auth } = this.props;

    return (
      <Post key={post.id}
            style={styles.zIndexUp}
            post={post}
            auth={auth}
            disabledSelfLink
            showLoginDialog={this.props.showLoginDialog}
            showConfirmCheckModal={this.onShowCheckModal}
            onCommentsButton={this.onFocusInput}/>
    );
  }

  render() {
    const { post, auth, intl: { formatMessage }, isShowModal } = this.props;
    const { isFetching } = this.state;

    const postTitle = post && !post.deleted ? post.title :
      isFetching ? formatMessage(i18n.loading) : formatMessage(i18n.nothingHere);

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
      <div id="capture-and-fire">
        {this.renderPost(post)}
        <div className="comment-list ui card" style={styles.commentsCardContainer}>
          <CommentComposer postId={post.id} auth={auth} style={styles.commentComposer} loadPost={this.loadPost}/>
          <Comments type={COMMENTS_BY_POST} option={post.id} />
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
      <div className={classNames('single-post ui text container',
       (isShowModal ? 'modal-container' : 'main-container'))}>
        <Helmet title={shortenString(postTitle, 17)}/>
        {isEmpty ? tempDom : postDom}
      </div>
    );
  }
}
