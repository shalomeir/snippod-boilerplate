'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    //components
    Spinner = require('../modules/Spinner.jsx'),
    //store
    postsStore = require('../../stores/postsStore'),
    //actions
    uiActions = require('../../actions/uiActions'),
    messagesActions = require('../../actions/messagesActions'),
    postActions = require('../../actions/postActions');


var ComposerBox = React.createClass({

  mixins: [
    Reflux.listenTo(postsStore, 'resetForm'),
    Reflux.listenTo(messagesActions.setError, 'onErrorMessage')
  ],

  getInitialState: function() {
    return {
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

  onErrorMessage: function(errorMessage) {
    this.refs.submit.getDOMNode().disabled = false;
    var errorSentence;
    if (typeof errorMessage.info !== 'undefined') {
      errorSentence = errorMessage.info[0].msg;
    } else {
      errorSentence = null;
    }
    this.setState({
      error: errorSentence,
      submitted: false
    });
  },

  submitPost: function(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var user = this.props.user;
    var titleEl = this.refs.title.getDOMNode();
    var linkEl = this.refs.link.getDOMNode();

    if (!user.loggedIn) {
      uiActions.showOverlay('login');
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

    postActions.submitPost(form);

  },



  render: function() {

    var cx = React.addons.classSet;
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
      <div id="composer-box" className="composer-box">
        <div id="header-panel" className="header-panel text-center">
          <form method="post" action="/posts" onSubmit={ this.submitPost } className="panel-form">
            <input type="text" name="title" className={ titleInputCx } placeholder="Title" ref="title" id="title"/>
            <input type="url" name="url" className={ linkInputCx } placeholder="Link" ref="link" id="url"/>
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

module.exports = ComposerBox;
