import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { defineMessages, FormattedMessage } from 'react-intl';
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
  state => state.entities.posts,
  state => state.postings.postsBySortingOption,
  (state, props) => props.sortingOption
], (posts, postsBySortingOption, sortingOption) => {
  const postsBySortingOptionPagination = postsBySortingOption[sortingOption] || { ids: [] };
  const postsBySortingOptionList = postsBySortingOptionPagination.ids.map(id => posts[id]);
  return {
    sortingOption,
    postsBySortingOptionPagination,
    postsBySortingOptionList
  };
});

@connect(
  mapStateToProps,
  { loadPostsBySortingOption }
)
@Radium
export default class Posts extends Component {

  static propTypes = {
    sortingOption: PropTypes.string.isRequired,
    postsBySortingOptionPagination: PropTypes.object.isRequired,
    postsBySortingOptionList: PropTypes.array.isRequired,
    loadPostsBySortingOption: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this._loadPostsBySortingOption = this._loadPostsBySortingOption.bind(this);
    this._handleLoadMoreClick = this._handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    this._loadPostsBySortingOption(this.props.sortingOption);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sortingOption !== nextProps.sortingOption) {
      this._loadPostsBySortingOption(nextProps.sortingOption);
    }
  }

  _loadPostsBySortingOption(sortingOption) {
    this.props.loadPostsBySortingOption(sortingOption);
  }

  _handleLoadMoreClick() {
    this._loadPostsBySortingOption(this.props.sortingOption, true);
  }

  renderPost(post) {
    return (
      <Post key={post.id}
            post={post} />
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
