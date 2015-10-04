'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    cx = require('classnames'),
    { appendKeyValueToForm } = require('../../../utils/StringControl'),

    //Mixins
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    ResetMessageAtWillUnmountMixin = require('../../mixins/ResetMessageAtWillUnmountMixin'),

    //components
    Spinner = require('../../commons/Spinner.jsx'),
    //store
    ComponentMessageStore = require('../../../stores/subs/ComponentMessageStore'),
    //actions
    PostsActions = require('../../../actions/posts/PostsActions'),
    UIActions = require('../../../actions/commons/UIActions');


var CommentComposer = React.createClass({

  mixins: [
    PureRenderMixin,
    ResetMessageAtWillUnmountMixin,
    Reflux.listenTo(PostsActions.thenSubmitCommentCompleted, 'resetForm'),
    Reflux.listenTo(ComponentMessageStore, 'onErrorMessage')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      error: null,
      submitted: false
    };
  },

  resetForm: function() {
    this.refs.commentText.getDOMNode().value = '';
    this.refs.submit.getDOMNode().disabled = false;
    this.setState({
      submitted: false
    });
  },

  onErrorMessage: function() {
    var errorMessage = ComponentMessageStore.getComponentMessages();
    var errorSentence = null;
    this.refs.submit.getDOMNode().disabled = false;
    if( errorMessage.failed !== null ) {
      errorSentence = '';
      for (var key in errorMessage.failed) {
        if (errorMessage.failed.hasOwnProperty(key)) {
          var errorMsg = errorMessage.failed[key][0];
          errorSentence = errorSentence.concat(errorMsg);
        }
      }
    }
    this.setState({
      error: errorSentence,
      submitted: false
    });
  },

  submitComment: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var commentTextEl = this.refs.commentText.getDOMNode();

    if (!this.props.auth.loggedIn) {
      UIActions.showOverlay('login');
      return;
    }

    if (commentTextEl.value.trim() === '') {
      this.setState({
        commentError: 'text_error'
      });
      return;
    }

    this.refs.submit.getDOMNode().disabled = true;
    this.setState({
      submitted: true
    });

    PostsActions.submitComment(form);
  },


  render: function() {

    var commentError = this.state.commentError;
    var commentTextInputCx = cx({
      'comment-input': true,
      'full-width': true,
      'input-error': commentError === 'text_error'
    });

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
      <div id="comment-composer" className="comment-composer">
        <form method="post" action="/comments/" onSubmit={ this.submitComment } className="comment-form">
          <textarea name="content" autofocus="autofocus" placeholder="Post a Comment" ref="commentText" className={ commentTextInputCx }></textarea>
          <button type="submit" className="button button-primary" ref="submit">
            { this.state.submitted ? <Spinner /> : 'Submit' }
          </button>
          <input type="hidden" name="post" value={ this.props.post.id } />
        </form>
        { error }
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = CommentComposer;
