'use strict';

var React = require('react'),
    { Route, DefaultRoute } = require('react-router'),
    App = require('./components/App.jsx'),
    //Login = require('./components/account/login.jsx'),
    //SignUp = require('./components/account/signup.jsx'),
    Forgot = require('./components/account/forgot.jsx'),
    Settings = require('./components/account/settings.jsx'),
    User = require('./components/account/user.jsx'),
    Topic = require('./components/topic/Topic.jsx');

var routes = (
  /* jshint ignore:start */
  <Route name='app' path='/' handler={App}>
    <DefaultRoute handler={Topic} />
    <Route name='login' path='/login' handler={Topic} />
    <Route name='register' path='/register' handler={Topic} />
    <Route name='forgot' path='/login/forgot' handler={Forgot} />
    <Route name='settings' path='/settings' handler={Settings} />
    <Route name='user' path='/user' handler={User} />
    <Route name='topic' path='/:topic' handler={Topic} />
  </Route>
  /* jshint ignore:end */
);

module.exports = routes;
