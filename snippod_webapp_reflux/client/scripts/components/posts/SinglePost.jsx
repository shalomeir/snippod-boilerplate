/**
*   Topic Component Description
*/

'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),
    Link = require('react-router').Link,

    //Mixins
    ResetMessageAtWillUnmountMixin = require('../mixins/ResetMessageAtWillUnmountMixin'),

    //components
    Post = require('./list/post/Post.jsx'),
    Comments = require('./list/Comments.jsx'),
    CommentComposer = require('./list/CommentComposer.jsx'),
    Spinner = require('../commons/Spinner.jsx'),
    //actions
    PostsActions = require('../../actions/posts/PostsActions'),
    //stores
    PostStore = require('../../stores/posts/PostStore'),
    ComponentMessageStore = require('../../stores/subs/ComponentMessageStore');

var SinglePost = React.createClass({

  mixins: [
    PureRenderMixin,
    ResetMessageAtWillUnmountMixin,
    Reflux.listenTo(PostStore, 'onPostUpdate'),
    Reflux.listenTo(ComponentMessageStore, 'onErrorMessage'),
    Reflux.listenTo(PostsActions.refreshDataFromStore, 'onPostUpdate')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      post: PostStore.get(Number(this.props.params.postId)),
      loading: false,
      error: null
    };
  },

  componentDidMount: function() {
    if(typeof this.state.post === 'undefined' ) {
      this._callPostsActions();
    }
  },

  onPostUpdate: function(args) {
    this.setState({
      post: PostStore.get(Number(this.props.params.postId)),
      loading: false
    });
    if(typeof this.state.post === 'undefined' ) {
      this._callPostsActions();
    }
  },

  onErrorMessage: function() {
    var errorMessage = ComponentMessageStore.getComponentMessages();
    var errorSentence = null;
    if( errorMessage.failed !== null ) {
      errorSentence = '';
      for (var key in errorMessage.failed) {
        if (errorMessage.failed.hasOwnProperty(key)) {
          var errorMsg = errorMessage.failed[key];
          errorSentence = errorSentence.concat(errorMsg);
        }
      }
    }
    this.setState({
      error: errorSentence,
      loading: false
    });
  },

  render: function() {

    var post = this.state.post;
    if (typeof post !== 'undefined' && post.isDeleted) {
      return (
        /* jshint ignore:start */
        <DocumentTitle title='Single Post'>
          <div className="singlepost main-container content full-width">
            { this.state.post ? <Post post={ this.state.post } {...this.props} /> : null }
            Go to <Link to="/"> Snippod's Home </Link>
          </div>
        </DocumentTitle>
        /* jshint ignore:end */
      );
    }

    var error = null;
    if (this.state.error) {
      error = (
        /* jshint ignore:start */
        <div className="error">
          { this.state.error }
        </div>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <DocumentTitle title='Single Post'>
        <div className="singlepost main-container content full-width">
          { this.state.loading ? <Spinner /> : null }
          { this.state.post ? <Post post={ this.state.post } {...this.props} /> : null }
          { this.state.post ? <CommentComposer post={ this.state.post } {...this.props} /> : null }
          { this.state.post ? <Comments post={ this.state.post } {...this.props} /> : null }
          { error }
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  },

  _callPostsActions: function() {
    this.setState({ loading: true });
    PostsActions.getPost(this.props.params.postId);
  }

});

module.exports = SinglePost;
