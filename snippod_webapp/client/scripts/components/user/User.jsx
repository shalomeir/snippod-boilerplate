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

    //actions
    UsersActions = require('../../actions/users/UsersActions'),
    PostsActions = require('../../actions/posts/PostsActions'),
    //stores
    UserStore = require('../../stores/users/UserStore'),
    ComponentMessageStore = require('../../stores/subs/ComponentMessageStore'),
    //components
    Profile = require('./profile/Profile.jsx'),
    UserPosts = require('./list/UserPosts.jsx'),
    UserComments = require('./list/UserComments.jsx'),
    Spinner = require('../commons/Spinner.jsx');


var User = React.createClass({

  mixins: [
    PureRenderMixin,
    ResetMessageAtWillUnmountMixin,
    Reflux.listenTo(UserStore, 'onUserUpdate'),
    Reflux.listenTo(PostsActions.refreshDataFromStore, 'onUserUpdate'),
    Reflux.listenTo(ComponentMessageStore, 'onErrorMessage'),
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      user: UserStore.get(Number(this.props.params.userId)),
      loading: false,
      error: null
    };
  },

  componentDidMount: function() {
    if(typeof this.state.user === 'undefined' ) {
      this._callUsersActions();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevProps.params.userId !== this.props.params.userId) {
      var nextState = this.getInitialState();
      this.setState(nextState);
      if(typeof nextState.user === 'undefined') {
        this._callUsersActions();
      }
    }
  },

  onUserUpdate: function() {
    this.setState({
      user: UserStore.get(Number(this.props.params.userId)),
      loading: false
    });
    if(typeof this.state.user === 'undefined' ) {
      this._callUsersActions();
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
    var user = this.state.user;

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
      <DocumentTitle title='User Profile'>
        <div className="user main-container content full-width">
          { this.state.loading ? <Spinner /> : null }
          { user ? <Profile user={ user } { ...this.props } /> : null }
          { user ? <UserPosts user={ user } { ...this.props } /> : null }
          { user ? <UserComments user={ user } { ...this.props } /> : null }
          { error }
        </div>
      </DocumentTitle>
      /* jshint ignore:end */
    );
  },

  _callUsersActions: function() {
    this.setState({ loading: true });
    UsersActions.getUser(this.props.params.userId);
  }

});

module.exports = User;
