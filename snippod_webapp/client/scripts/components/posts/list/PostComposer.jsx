'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    cx = require('classnames'),
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


var PostComposer = React.createClass({

  mixins: [
    PureRenderMixin,
    ResetMessageAtWillUnmountMixin,
    Reflux.listenTo(PostsActions.nextSubmitPostCompleted, 'resetForm'),
    Reflux.listenTo(ComponentMessageStore, 'onErrorMessage')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      error: null,
      submitted: false
    };
  },

  resetForm: function() {
    this.refs.title.getDOMNode().value = '';
    this.refs.link.getDOMNode().value = '';
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
      errorSentence = "";
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

  submitPost: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var auth = this.props.auth;
    var titleEl = this.refs.title.getDOMNode();
    var linkEl = this.refs.link.getDOMNode();

    if (!auth.loggedIn) {
      UIActions.showOverlay('login');
      return;
    }

    if (titleEl.value.trim() === '') {
      this.setState({
        'postError': 'title_error'
      });
      return;
    }

    if (linkEl.value.trim() === '') {
      this.setState({
        'postError': 'link_error'
      });
      return;
    }

    this.refs.submit.getDOMNode().disabled = true;
    this.setState({
      submitted: true
    });

    PostsActions.submitPost(form);

  },



  render: function() {

    var postError = this.state.postError;

    var titleInputCx = cx({
      'panel-input': true,
      'input-error': postError === 'title_error'
    });

    var linkInputCx = cx({
      'panel-input': true,
      'input-error': postError === 'link_error'
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
      <div id="post-composer" className="post-composer">
        <div id="composer-panel" className="composer-panel">
          <div>Submit any post link!</div>
          <form method="post" action="/posts/" onSubmit={ this.submitPost } className="panel-form text-center">
            <input type="text" name="title" className={ titleInputCx } placeholder="Title" ref="title" id="title"/>
            <input type="url" name="link" className={ linkInputCx } placeholder="Link" ref="link" id="link"/>
            <button type="submit" className="button panel-button button-outline" ref="submit">
              { this.state.submitted ? <Spinner /> : 'Submit' }
            </button>
          </form>
        </div>
        { error }
      </div>
      /* jshint ignore:end */

    );
  }

});

module.exports = PostComposer;
