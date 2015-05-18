'use strict';

var React = require('react'),
    router = require('./router'),
    UIActions = require('./actions/commons/UIActions');

var attachFastClick = require('fastclick'),
    ga = require('react-ga'),
    GA_TRACKING_ID = require('./constants/defaults').GA_TRACKING_ID;

ga.initialize(GA_TRACKING_ID);

/* jshint ignore:start */
router.run((Handler, state) => {
  ga.pageview(state.path);
  React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
});
/* jshint ignore:end */

// fastclick eliminates 300ms click delay on mobile
attachFastClick(document.body);
