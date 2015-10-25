'use strict';



var React = require('react'),
    { PropTypes } = React,
    { History } = require('react-router'),
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    sortingOptionDefault = require('../../../constants/defaults')
                            .sortingOption,
    //components
    Post = require('./post/Post.jsx'),
    Spinner = require('../../commons/Spinner.jsx'),

    //store
    PostListStore = require('../../../stores/posts/PostListStore'),
    PostStore = require('../../../stores/posts/PostStore'),
    //actions
    PostsActions = require('../../../actions/posts/PostsActions');

//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Posts = React.createClass({

  mixins: [
    PureRenderMixin,
    History,
    Reflux.listenTo(PostListStore, 'onPostsUpdate'),
    Reflux.listenTo(PostStore, 'onPostsUpdate'),
    Reflux.listenTo(PostsActions.refreshDataFromStore, 'onPostsUpdate')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  getInitialState: function() {
    var postListObjects = PostListStore.getObjects(this.props.location.query.sorting);
    return this._parsePostListObjects(postListObjects);
  },

  componentDidMount: function() {
    if(this.state.pageCount === 0) {
      this._callPostsActions();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevProps.location.query.sorting !== this.props.location.query.sorting) {
      var nextState = this.getInitialState();
      this.setState(nextState);
      if(nextState.pageCount === 0) {
        this._callPostsActions();
      }
    }
  },

  _parsePostListObjects: function(postListObjects) {
    var posts = postListObjects.posts;
    return {
      posts: posts,
      nextPage: postListObjects.pagenatedList.getNextPageUrl(),
      pageCount: postListObjects.pagenatedList.getPageCount(),
      loading: false
    };
  },

  onPostsUpdate: function() {
    var postListObjects = PostListStore.getObjects(this.props.location.query.sorting);
    this.setState(this._parsePostListObjects(postListObjects));
    if (postListObjects.pagenatedList.getPageCount()===0) {
      this._callPostsActions();
    }
  },

  render: function() {
    var posts = this.state.posts;
    var auth = this.props.auth;
    var sortOption = this.props.location.query.sorting || sortingOptionDefault.defaultSorting;
    // possible sort values (defined in constants/defaults.js)
    var sortValues = Object.keys(sortingOptionDefault.optionValues);

    posts = posts.map(function(post) {
      /* jshint ignore:start */
      return <Post post={ post } auth={ auth } key={ post.id } />;
      /* jshint ignore:end */
    }.bind(this));

    var options = sortValues.map(function(optionText, i) {
      /* jshint ignore:start */
      return <option value={ sortingOptionDefault.optionValues[i] } key={ i }>
              { optionText }</option>;
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

  updateSortBy: function(e) {
    e.preventDefault();
    var query = { sorting : this.refs.sortBy.getDOMNode().value };
    //router.transitionTo('app', null, query);
    this.history.pushState(null, '/', query);
  },

  handleLoadMoreClick: function() {
    this._callPostsActions(this.state.nextPage);
  },

  _callPostsActions: function(nextPageUrl) {
    this.setState({ loading: true });
    var action = '/posts/';
    var query = {
      sorting: this.props.location.query.sorting || sortingOptionDefault.defaultSorting
    };
    if ( nextPageUrl && nextPageUrl !== '/' ) {
      PostsActions.getPosts(nextPageUrl);
    } else {
      PostsActions.getPosts(action,query);
    }
  }

});

module.exports = Posts;
