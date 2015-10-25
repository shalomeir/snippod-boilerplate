'use strict';

import React from 'react'
import { Router, Route, Link } from 'react-router'

import history from './utils/History.js'
//location: process.env.NODE_ENV === 'production' ? HashLocation : HistoryLocation,

//var router = require('./router'),
var routes = require('./routes'),
    UIActions = require('./actions/commons/UIActions');

var attachFastClick = require('fastclick'),
    ga = require('react-ga'),
    GA_TRACKING_ID = require('./constants/defaults').GA_TRACKING_ID;

ga.initialize(GA_TRACKING_ID);

/* jshint ignore:start */
React.render(<Router history={history}>{routes}</Router>, document.getElementById('app-wrapper'))

//router.run((Handler, state) => {
//  ga.pageview(state.path);
//  React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
//});
/* jshint ignore:end */

// for google analytics pageview
history.listen(function (location) {
  ga.pageview(location.pathname);
});


// fastclick eliminates 300ms click delay on mobile
attachFastClick(document.body);
