/**
*   Topic Component Description
*/

'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),

    //Mixins
    ResetMessageAtWillUnmountMixin = require('../mixins/ResetMessageAtWillUnmountMixin'),

    //components
    Post = require('./postlist/post/Post.jsx'),
    Comments = require('./postlist/Comments.jsx'),
    CommentComposer = require('./postlist/CommentComposer.jsx'),
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
    query: PropTypes.object.isRequired,
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
      this._callPostActions();
    }
  },

  onPostUpdate: function(args) {
    this.setState({
      post: PostStore.get(Number(this.props.params.postId)),
      loading: false
    });
    if(typeof this.state.post === 'undefined' ) {
      this._callPostActions();
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
    var commentsComp = null;
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
          { error }
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  },

  _callPostActions: function() {
    this.setState({ loading: true });
    var action = '/posts/'+this.props.params.postId+'/';
    PostsActions.getPost(action);
  }

});

module.exports = SinglePost;
