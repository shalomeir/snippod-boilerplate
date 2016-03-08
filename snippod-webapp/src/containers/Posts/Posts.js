import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { showLoginDialog, showRegisterDialog, redirectReplacePath } from 'ducks/application/application';
import { loadPostsBySortingOption } from 'ducks/posts/posts';

import { List, Post } from 'components';

const i18n = defineMessages({
  loginMessageHeader: {
    id: 'ground.login.messageHeader',
    defaultMessage: 'Log-in'
  },
});

const styles = {
  container: {
    marginTop: '1em',
    marginBottom: '1em'
  },

  postsList: {
    margin: 'auto'
  }

};

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
  { loadPostsBySortingOption, showLoginDialog }
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
  };

  constructor() {
    super();
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
    }
    if (!nextProps.postsBySortingOptionPagination.isFetching &&
      this.props.postsBySortingOptionPagination !== nextProps.postsBySortingOptionPagination &&
      !nextProps.postsBySortingOptionPagination.pageCount) {
      this._loadPostsBySortingOption(nextProps.sortingOption);
    }
  }

  _loadPostsBySortingOption(sortingOption, nextPage) {
    this.props.loadPostsBySortingOption(sortingOption, nextPage);
  }

  _handleLoadMoreClick() {
    this._loadPostsBySortingOption(this.props.sortingOption, true);
  }

  renderPost(post) {
    const { intl, auth } = this.props;

    return (
      <Post key={post.id}
            post={post}
            intl={intl}
            auth={auth}
            showLoginDialog={this.props.showLoginDialog}/>
    );
  }

  render() {
    const { sortingOption,
      postsBySortingOptionPagination, postsBySortingOptionList } = this.props;

    return (
      <div className="posts ui container">
        <div>
          <List key={sortingOption}
                renderItem={this.renderPost}
                items={postsBySortingOptionList}
                onLoadMoreClick={this._handleLoadMoreClick}
                loadingLabel={`Loading posts...`}
                {...postsBySortingOptionPagination} />
        </div>
      </div>
    );
  }
}
