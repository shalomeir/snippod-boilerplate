'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    userActions = require('../../actions/userActions'),
    uiActions = require('../../actions/uiActions'),
    Router = require('react-router'),
    { Link } = Router;


var NavBar = React.createClass({

  componentDidMount: function() {
    var pathString = this.props.path.toLowerCase().trim();
    if (pathString === String('/login')) {
      uiActions.showOverlay('login');
    } else if (pathString === String('/register')) {
      uiActions.showOverlay('register');
    }
  },

  render: function() {
    var user = this.props.user;
    var navLinks = user.loggedIn ? (
      /* jshint ignore:start */
      <div className="nav-list float-right">
        <span className="nav-item">
          Hello <Link to="user">{user.firstName ? user.firstName : user.email}</Link>
        </span>
        <span className="nav-item">
          <Link to="settings">My Account</Link>
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
          <a onClick={ uiActions.showOverlay.bind(this,'login') }>Sign In</a>
        </span>
        <span className="nav-item">
          <a onClick={ uiActions.showOverlay.bind(this,'register') }>Register</a>
        </span>
      </div>
      /* jshint ignore:end */
    );

    return (
      /* jshint ignore:start */
      <div className="navbar">
        <div className="nav-list float-left">
          <div className="menu-title"><Link to="app">Snippod's Home</Link></div>
        </div>
        {navLinks}
      </div>
      /* jshint ignore:end */
    );
  },

  handleLogout: function(e) {
    e.preventDefault();
    userActions.logout();
  }

});

module.exports = NavBar;
