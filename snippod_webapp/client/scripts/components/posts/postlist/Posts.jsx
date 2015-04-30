'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    router = require('../../../router'),
    sortingOptionDefault = require('../../../constants/defaults')
                            .sortingOption.optionValues,
    //components
    Post = require('./post/Post.jsx'),
    Spinner = require('../../commons/Spinner.jsx'),

    //store
    PostListStore = require('../../../stores/posts/PostListStore'),
    PostStore = require('../../../stores/posts/PostStore'),
    //actions
    PostsActions = require('../../../actions/posts/PostsActions');


var Posts = React.createClass({

  mixins: [
    PureRenderMixin,
    Reflux.listenTo(PostListStore, 'onPostsUpdate'),
    Reflux.listenTo(PostStore, 'onPostUpdate')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  getInitialState: function() {
    var postListObjects = PostListStore.getObjects();
    if (postListObjects.pagenatedList.getPageCount()===0) {
      this._callPostsActions();
    }
    return this._parsePostListObjects(postListObjects);
  },

  _parsePostListObjects: function(postListObjects) {
    var posts = postListObjects.posts;
    var loading = postListObjects.pagenatedList.getPageCount() === 0;
    return {
      sortOption: postListObjects.currentSortOption,
      posts: posts,
      loading: loading, //if onPostsUpdate and success, this should be false.
      nextPage: postListObjects.pagenatedList.getNextPageUrl()
    };
  },

  onPostsUpdate: function(postListObjects) {
    if (postListObjects.pagenatedList.getPageCount()===0) {
      this._callPostsActions();
    }
    this.setState(this._parsePostListObjects(postListObjects));
  },

  onPostUpdate: function(postObject) {
    var postListObjects = PostListStore.getObjects(this.props.params.sorting);
    this.setState(this._parsePostListObjects(postListObjects));
  },

  render: function() {
    var posts = this.state.posts;
    var account = this.props.account;
    var auth = this.props.auth;
    var sortOption = this.state.sortOption;
    // possible sort values (defined in constants/defaults.js)
    var sortValues = Object.keys(sortingOptionDefault);

    posts = posts.map(function(post) {
      /* jshint ignore:start */
      return <Post post={ post } {...this.props} key={ post.id } />;
      /* jshint ignore:end */
    }.bind(this));

    var options = sortValues.map(function(optionText, i) {
      /* jshint ignore:start */
      return <option value={ sortingOptionDefault[i] } key={ i }>{ optionText }</option>;
      /* jshint ignore:end */
    });

    var pagination = (
      /* jshint ignore:start */
      this.state.nextPage ? (
          <button onClick={this.handleLoadMoreClick} disabled={this.state.loading}>
            {this.state.loading ? 'Loading...' : 'Load more'}
          </button>
      ) : 'No More Posts'
      /* jshint ignore:end */
    );

    return (
      /* jshint ignore:start */
      <div className="content full-width">
        <label htmlFor="sortby-select" className="sortby-label">Sort by </label>
        <div className="sortby">
          <select
            id="sortby-select"
            className="sortby-select"
            onChange={ this.updateSortBy }
            value={ sortOption }
            ref="sortBy"
          >
            { options }
          </select>
        </div>
        <hr />
        <div className="posts">
          { posts }
          { this.state.loading ? <Spinner /> : null }
        </div>
        <hr />
        <nav className="pagination">
          { pagination }
        </nav>
      </div>
      /* jshint ignore:end */

    );
  },

  //updateSortBy: function(e) {
  //  e.preventDefault();
  //
  //  var currentPage = this.state.currentPage || 1;
  //
  //  postActions.setSortBy(this.refs.sortBy.getDOMNode().value);
  //
  //  this.setState({
  //    loading: true
  //  });
  //
  //  if (currentPage === 1) {
  //    postActions.stopListeningToPosts();
  //    postActions.listenToPosts(currentPage);
  //  } else {
  //    router.transitionTo('posts', { pageNum: 1 });
  //  }
  //},

  updateSortBy: function(e) {
    e.preventDefault();
    var query = this.refs.sortBy.getDOMNode().value;
    router.transitionTo('app', null, query);
  },

  handleLoadMoreClick: function() {
    this._callPostsActions(this.state.nextPage);
  },

  _callPostsActions: function(nextPageUrl) {
    var action = '/posts/';
    var query = {
      sorting: this.props.params.sorting
    };
    if ( nextPageUrl && nextPageUrl !== '/' ) {
      PostsActions.getPosts(nextPageUrl,query);
    } else {
      PostsActions.getPosts(action,query);
    }
  }

});

module.exports = Posts;
