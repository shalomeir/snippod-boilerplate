'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,

    //components
    Post = require('../../posts/list/post/Post.jsx'),
    Spinner = require('../../commons/Spinner.jsx'),

    //store
    UserPostListStore = require('../../../stores/posts/UserPostListStore'),
    PostStore = require('../../../stores/posts/PostStore'),
    //actions
    PostsActions = require('../../../actions/posts/PostsActions');

//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var UserPosts = React.createClass({

  mixins: [
    PureRenderMixin,
    Reflux.listenTo(UserPostListStore, 'onUserPostsUpdate'),
    Reflux.listenTo(PostStore, 'onUserPostsUpdate'),
    Reflux.listenTo(PostsActions.refreshDataFromStore, 'onUserPostsUpdate'),

    require('../../mixins/pluralize')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  },

  getInitialState: function() {
    var userPostListObjects = UserPostListStore.getObjects(this.props.user.id);
    return this._parseUserPostListObjects(userPostListObjects);
  },

  componentDidMount: function() {
    if(this.state.pageCount === 0) {
      this._callPostsActions();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevProps.user.id !== this.props.user.id) {
      var nextState = this.getInitialState();
      this.setState(nextState);
      if(nextState.pageCount === 0) {
        this._callPostsActions();
      }
    }
  },

  _parseUserPostListObjects: function(userPostListObjects) {
    var posts = userPostListObjects.posts;
    return {
      posts: posts,
      nextPage: userPostListObjects.pagenatedList.getNextPageUrl(),
      pageCount: userPostListObjects.pagenatedList.getPageCount(),
      totalCount: userPostListObjects.totalCount,
      loading: false
    };
  },

  onUserPostsUpdate: function() {
    var userPostListObjects = UserPostListStore.getObjects(this.props.user.id);
    this.setState(this._parseUserPostListObjects(userPostListObjects));
    if (userPostListObjects.pagenatedList.getPageCount()===0) {
      this._callPostsActions();
    }
  },

  render: function() {
    var user = this.props.user,
        posts = this.state.posts,
        totalCount = this.state.totalCount,
        auth = this.props.auth;

    posts = posts.map(function(post) {
      /* jshint ignore:start */
      return <Post post={ post } auth={ auth } key={ post.id } />;
      /* jshint ignore:end */
    }.bind(this));

    var pagination = (
      /* jshint ignore:start */
      this.state.nextPage ? (
          <button onClick={this.handleLoadMoreClick} disabled={this.state.loading}>
            {this.state.loading ? 'Loading...' : 'Load more'}
          </button>
      ) : null
      /* jshint ignore:end */
    );

    return (
      /* jshint ignore:start */
      <div className="user-posts">
        <h3>{ user.username }'s Posts</h3>
        <h4>{ totalCount || totalCount === 0 ? this.pluralize(totalCount, 'Post') : null }</h4>
        { posts }
        { this.state.loading ? <Spinner /> : null }
        <br />
        <nav className="pagination">
          { pagination }
        </nav>
        <hr />
      </div>
      /* jshint ignore:end */

    );
  },

  handleLoadMoreClick: function() {
    this._callPostsActions(this.state.nextPage);
  },

  _callPostsActions: function(nextPageUrl) {
    this.setState({ loading: true });
    var action = '/user/'+this.props.user.id+'/posts/';
    if ( nextPageUrl && nextPageUrl !== '/' ) {
      PostsActions.getUserPosts(nextPageUrl);
    } else {
      PostsActions.getUserPosts(action);
    }
  }

});

module.exports = UserPosts;
