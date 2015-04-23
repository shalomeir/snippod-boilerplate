'use strict';

var React = require('react'),
    { Route, DefaultRoute } = require('react-router'),
    App = require('./components/App.jsx'),
    //Login = require('./components/authentication/login.jsx'),
    //SignUp = require('./components/authentication/signup.jsx'),
    Forgot = require('./components/authentication/Forgot.jsx'),
    Settings = require('./components/authentication/Settings.jsx'),
    Account = require('./components/authentication/Account.jsx'),
    Empty = require('./components/subs/Empty.jsx'),
    Topic = require('./components/posts/Topic.jsx');

var routes = (
  /* jshint ignore:start */
  <Route name='app' path='/' handler={App}>
    <DefaultRoute handler={Topic} />
    <Route name='login' path='/login' handler={Empty} />
    <Route name='register' path='/register' handler={Empty} />
    <Route name='forgot' path='/login/forgot' handler={Forgot} />
    <Route name='settings' path='/settings' handler={Settings} />
    <Route name='me' path='/me' handler={Account} />
    <Route name='topic' path='/:topic' handler={Topic} />
    <Route name='empty' path='/empty' handler={Empty} />
  </Route>
  /* jshint ignore:end */
);

module.exports = routes;
