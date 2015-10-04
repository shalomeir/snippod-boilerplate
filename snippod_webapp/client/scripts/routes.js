'use strict';

import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

//var React = require('react'),
//    { Route, DefaultRoute } = require('react-router'),

var App = require('./components/App.jsx'),
    //Login = require('./components/authentication/login.jsx'),
    //SignUp = require('./components/authentication/signup.jsx'),
    Forgot = require('./components/authentication/Forgot.jsx'),
    Settings = require('./components/authentication/Settings.jsx'),
    Account = require('./components/authentication/Account.jsx'),
    Empty = require('./components/subs/Empty.jsx'),
    User = require('./components/user/User.jsx'),
    Topic = require('./components/posts/Topic.jsx'),
    SinglePost = require('./components/posts/SinglePost.jsx'),
    requireAuth = require('./utils/requireAuth');

var routes = (
  /* jshint ignore:start */
  <Route path='/' component={App}>
    <IndexRoute component={Topic} />
    <Route path='/login' component={Empty} />
    <Route path='/register' component={Empty} />
    <Route path='/login/forgot' component={Forgot} />
    <Route path='/settings' component={Settings} onEnter={requireAuth}/>
    <Route path='/user/:userId' component={User} />
    <Route path='/post/:postId' component={SinglePost} />
    <Route path='/empty' component={Empty} />
  </Route>

  /* jshint ignore:end */
);

module.exports = routes;
