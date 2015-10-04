'use strict';

var React = require('react'),
    { PropTypes } = React,
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    Link = require('react-router').Link;


var Profile = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    params: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  },

  render: function () {
    var account = this.props.account,
        user = this.props.user,
        auth = this.props.auth;

    var linkSetting = null;
    if (auth.loggedIn && account.id === user.id) {
      linkSetting = (
        /* jshint ignore:start */
        <Link to="/settings"> [setting] </Link>
        /* jshint ignore:end */
      );
    }

    var userFullName = (
      /* jshint ignore:start */
      <div> Did not setup user's full name yet. </div>
      /* jshint ignore:end */
    );
    if (user.fullName !== '') {
      userFullName = (
        /* jshint ignore:start */
        <div> Full Name :  { user.fullName }</div>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div className="profile">
        <h1>{ this.props.user.username + '\'s' } Profile</h1>
        <h3>Profile Information { linkSetting } </h3>
        { userFullName }
        <hr />
      </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = Profile;
