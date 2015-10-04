'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,

    //components
    Comment = require('../../posts/list/comment/Comment.jsx'),
    Spinner = require('../../commons/Spinner.jsx'),

    //store
    UserCommentListStore = require('../../../stores/posts/UserCommentListStore'),
    CommentStore = require('../../../stores/posts/CommentStore'),
    //actions
    PostsActions = require('../../../actions/posts/PostsActions');

//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var UserPosts = React.createClass({

  mixins: [
    PureRenderMixin,
    Reflux.listenTo(UserCommentListStore, 'onUserCommentsUpdate'),
    Reflux.listenTo(CommentStore, 'onUserCommentsUpdate'),
    Reflux.listenTo(PostsActions.refreshDataFromStore, 'onUserCommentsUpdate'),

    require('../../mixins/pluralize')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  },

  getInitialState: function() {
    var userCommentListObjects = UserCommentListStore.getObjects(this.props.user.id);
    return this._parseUserCommentListObjects(userCommentListObjects);
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

  _parseUserCommentListObjects: function(userCommentListObjects) {
    var comments = userCommentListObjects.comments;
    return {
      comments: comments,
      nextPage: userCommentListObjects.pagenatedList.getNextPageUrl(),
      pageCount: userCommentListObjects.pagenatedList.getPageCount(),
      totalCount: userCommentListObjects.totalCount,
      loading: false
    };
  },

  onUserCommentsUpdate: function() {
    var userCommentListObjects = UserCommentListStore.getObjects(this.props.user.id);
    this.setState(this._parseUserCommentListObjects(userCommentListObjects));
    if (userCommentListObjects.pagenatedList.getPageCount()===0) {
      this._callPostsActions();
    }
  },

  render: function() {
    var user = this.props.user,
        comments = this.state.comments,
        totalCount = this.state.totalCount,
        auth = this.props.auth;

    comments = comments.map(function(comment) {
      /* jshint ignore:start */
      return <Comment comment={ comment } auth={ auth } showPostTitle={ true } key={ comment.id } />;
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
      <div className="user-comments">
        <h3>{ user.username }'s Comments</h3>
        <h4>{ totalCount || totalCount === 0 ? this.pluralize(totalCount, 'Comment') : null }</h4>
        { comments }
        { this.state.loading ? <Spinner /> : null }
        <nav className="pagination">
          { pagination }
        </nav>
      </div>
      /* jshint ignore:end */
    );
  },

  handleLoadMoreClick: function() {
    this._callPostsActions(this.state.nextPage);
  },

  _callPostsActions: function(nextPageUrl) {
    this.setState({ loading: true });
    var action = '/user/'+this.props.user.id+'/comments/';
    if ( nextPageUrl && nextPageUrl !== '/' ) {
      PostsActions.getUserComments(nextPageUrl);
    } else {
      PostsActions.getUserComments(action);
    }
  }

});

module.exports = UserPosts;
