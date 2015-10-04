'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,

    //components
    Comment = require('./comment/Comment.jsx'),
    Spinner = require('../../commons/Spinner.jsx'),

    //store
    CommentListStore = require('../../../stores/posts/CommentListStore'),
    CommentStore = require('../../../stores/posts/CommentStore'),
    //actions
    PostsActions = require('../../../actions/posts/PostsActions');

//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Comments = React.createClass({

  mixins: [
    PureRenderMixin,
    Reflux.listenTo(CommentListStore, 'onCommentsUpdate'),
    Reflux.listenTo(CommentStore, 'onCommentsUpdate'),
    Reflux.listenTo(PostsActions.refreshDataFromStore, 'onCommentsUpdate'),

    require('../../mixins/pluralize')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
  },

  getInitialState: function() {
    var commentListObjects = CommentListStore.getObjects(this.props.post.id);
    return this._parseCommentListObjects(commentListObjects);
  },

  componentDidMount: function() {
    if(this.state.pageCount === 0) {
      this._callPostsActions();
    }
  },

  _parseCommentListObjects: function(commentListObjects) {
    var comments = commentListObjects.comments;
    return {
      comments: comments,
      nextPage: commentListObjects.pagenatedList.getNextPageUrl(),
      pageCount: commentListObjects.pagenatedList.getPageCount(),
      loading: false
    };
  },

  onCommentsUpdate: function() {
    var commentListObjects = CommentListStore.getObjects(this.props.post.id);
    this.setState(this._parseCommentListObjects(commentListObjects));
    if (commentListObjects.pagenatedList.getPageCount()===0) {
      this._callPostsActions();
    }
  },

  render: function() {
    var comments = this.state.comments,
        post = this.props.post,
        auth = this.props.auth;

    comments = comments.map(function(comment) {
      /* jshint ignore:start */
      return <Comment comment={ comment } auth={ auth } key={ comment.id } />;
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
      <div className="comments">
        <h2>{ this.pluralize(post.commentCount, 'Comment') }</h2>
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
    var action = '/post/'+this.props.post.id+'/comments/';
    if ( nextPageUrl && nextPageUrl !== '/' ) {
      PostsActions.getComments(nextPageUrl);
    } else {
      PostsActions.getComments(action);
    }
  }

});

module.exports = Comments;
