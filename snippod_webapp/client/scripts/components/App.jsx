'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    DocumentTitle = require('react-document-title'),
    { RouteHandler } = require('react-router'),
    { PropTypes } = React,
    $ = require('jquery'),
    NavBar = require('./subs/navbar.jsx'),
    Login = require('./subs/Login.jsx'),
    Register = require('./subs/Register.jsx'),
    Messages = require('./modules/messages.jsx'),
    DomContol = require('../utils/domControl'),
    userStore = require('../stores/userStore'),
    uiActions = require('../actions/uiActions');


var App = React.createClass({
  mixins: [
    DomContol,
    Reflux.listenTo(userStore,'onUserUpdate'),
    Reflux.listenTo(uiActions.showOverlay, 'showOverlay'),
    Reflux.listenTo(uiActions.hideOverlay, 'hideOverlay')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      user: userStore.getUser(),
      showOverlay: false,
      overlayType: 'login'
    };
  },

  onUserUpdate: function(user) {
    this.setState({
      user: user,
      showOverlay: false
    });
  },

  showOverlay: function(type) {
    var overlay = this.refs.overlay.getDOMNode();
    overlay.addEventListener('click', this.hideOverlayListener);
    this.setState({
      overlayType: type,
      showOverlay: true
    });
  },

  componentDidMount: function() {
    $(document).keyup(function(e) {
      if (e.keyCode === 27) { // esc
        e.preventDefault();
        this.hideOverlay();
      }
    }.bind(this));
  },

  hideOverlayListener: function(e) {
    if (!this.isChildNodeOf(e.target, ['overlay-content'])) {
      this.hideOverlay();
    }
  },

  hideOverlay: function() {
    this.setState({
      showOverlay: false
    });
  },

  render: function() {
    var cx = React.addons.classSet;
    var user = this.state.user;

    var overlayCx = cx({
      'md-overlay': true,
      'md-show': this.state.showOverlay
    });

    /* jshint ignore:start */
    var overlayContent = <Login />;
    if (this.state.overlayType === 'register') {
      overlayContent = <Register />;
    };
    /* jshint ignore:end */

    return (
      /* jshint ignore:start */
      <DocumentTitle title='App Main'>
        <div className='App wrapper full-height' id='app'>
          <header className='header'>
            <NavBar {...this.props} user={user} />
          </header>
          <main id='content' className='full-height inner'>
            <Messages />
            <RouteHandler {...this.props} user={user} />
          </main>
          <div className={ overlayCx } ref="overlay">{ overlayContent }</div>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */

    );
  }

});

module.exports = App;
