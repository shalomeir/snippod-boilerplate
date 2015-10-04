'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    { PropTypes } = React,
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    DocumentTitle = require('react-document-title'),
    //{ RouteHandler } = require('react-router'),
    $ = require('jquery'),
    cx = require('classnames'),
    NavBar = require('./navbar/Navbar.jsx'),
    Login = require('./authentication/Login.jsx'),
    Register = require('./authentication/Register.jsx'),
    Messages = require('./subs/Messages.jsx'),
    DomContol = require('../utils/DomControl'),
    AccountStore = require('../stores/authentication/AccountStore'),
    AuthStore = require('../stores/authentication/AuthStore'),
    PageStore = require('../stores/commons/PageStore'),
    AuthStoreJoinTrailer = require('../stores/authentication/AuthStoreJoinTrailer'),
    AuthAccountActions = require('../actions/authentication/AuthAccountActions'),
    MessagesActions = require('../actions/subs/MessagesActions'),
    UIActions = require('../actions/commons/UIActions');

var App = React.createClass({
  mixins: [
    PureRenderMixin,
    DomContol,
    Reflux.listenTo(AccountStore,'onAccountUpdate'),
    Reflux.listenTo(AuthStore,'onAuthUpdate'),
    Reflux.listenTo(UIActions.showOverlay, 'showOverlay'),
    Reflux.listenTo(UIActions.hideOverlay, 'hideOverlay')
  ],

  propTypes: {
    params: PropTypes.object.isRequired,
  },

  getInitialState: function() {

    AuthAccountActions.preLogin();

    return {
      auth: AuthStore.getAuth(),
      account: AccountStore.getAccount(),
      showOverlay: false,
      overlayType: 'login'
    };
  },

  onAccountUpdate: function() {
    this.setState({
      account: AccountStore.getAccount()
    });
  },

  onAuthUpdate: function() {
    this.setState({
      auth: AuthStore.getAuth(),
      showOverlay: false
    });
  },

  showOverlay: function(type) {
    MessagesActions.resetComponentMessages();
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
    MessagesActions.resetComponentMessages();
  },

  render: function() {
    var account = this.state.account;
    var auth = this.state.auth;

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
            <NavBar {...this.props} account={account} auth={auth} />
          </header>
          <main id='content' className='full-height inner'>
            <Messages />
            {React.cloneElement(this.props.children, {account: account, auth:auth })}
          </main>
          <div className={ overlayCx } ref="overlay">{ overlayContent }</div>
        </div>
      </DocumentTitle>
      /* jshint ignore:end */

    );
  }

});

module.exports = App;
