'use strict';

var React = require('react'),
    { PropTypes } = React,
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions'),
    UIActions = require('../../actions/commons/UIActions'),
    Router = require('react-router'),
    { Link } = Router;


var NavBar = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  },

  render: function() {
    var account = this.props.account;
    var auth = this.props.auth;
    var navLinks = auth.loggedIn ? (
      /* jshint ignore:start */
      <div className="nav-list float-right">
        <span className="nav-item">
          Hi, <Link to={`/user/${account.id}`}>{account.username ? account.username : account.email}</Link>
        </span>
        <span className="nav-item">
          <Link to="/settings">My Account</Link>
        </span>
        <span className="nav-item">
          <Link to="/logout" onClick={this.handleLogout}>Logout</Link>
        </span>
      </div>
      /* jshint ignore:end */
    ) : (
      /* jshint ignore:start */
      <div className="nav-list float-right">
        <span className="nav-item">
          <a onClick={ UIActions.showOverlay.bind(this,'login') }>Sign In</a>
        </span>
        <span className="nav-item">
          <a onClick={ UIActions.showOverlay.bind(this,'register') }>Register</a>
        </span>
      </div>
      /* jshint ignore:end */
    );

    return (
      /* jshint ignore:start */
      <div className="navbar">
        <div className="nav-list float-left">
          <div className="menu-title"><Link to="/">Snippod's Home</Link></div>
        </div>
        {navLinks}
      </div>
      /* jshint ignore:end */
    );
  },

  handleLogout: function(e) {
    e.preventDefault();
    AuthAccountActions.logout();
  }

});

module.exports = NavBar;
