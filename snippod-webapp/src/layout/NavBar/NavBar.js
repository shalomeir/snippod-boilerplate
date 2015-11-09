import React, {Component, PropTypes} from 'react';
//import {connect} from 'react-redux';

//@connect(
//    state => ({user: state.auth.user}),
//  {logout, pushState})
export default class NavBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  render() {
    //const auth = this.props.auth;
    //var navLinks = auth.loggedIn ? (
    //  /* jshint ignore:start */
    //  <div className="nav-list float-right">
    //    <span className="nav-item">
    //      Hi, <Link to={`/user/${account.id}`}>{account.username ? account.username : account.email}</Link>
    //    </span>
    //    <span className="nav-item">
    //      <Link to="/settings">My Account</Link>
    //    </span>
    //    <span className="nav-item">
    //      <Link to="/logout" onClick={this.handleLogout}>Logout</Link>
    //    </span>
    //  </div>
    //  /* jshint ignore:end */
    //) : (
    //  /* jshint ignore:start */
    //  <div className="nav-list float-right">
    //    <span className="nav-item">
    //      <a onClick={ UIActions.showOverlay.bind(this,'login') }>Sign In</a>
    //    </span>
    //    <span className="nav-item">
    //      <a onClick={ UIActions.showOverlay.bind(this,'register') }>Register</a>
    //    </span>
    //  </div>
    //  /* jshint ignore:end */
    //);

    return (
      <nav className="nav-bar">
        <header className="header">
          <div className="navbar">
              <div className="menu-title">Snippod's Navbar</div>
          </div>
        </header>
      </nav>
    );
  }
}
