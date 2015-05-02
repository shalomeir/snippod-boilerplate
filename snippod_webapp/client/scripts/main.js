'use strict';

var React = require('react'),
    router = require('./router'),
    UIActions = require('./actions/commons/UIActions');

var attachFastClick = require('fastclick');


/* jshint ignore:start */
router.run((Handler, state) => {
  React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
});
/* jshint ignore:end */

// fastclick eliminates 300ms click delay on mobile
attachFastClick(document.body);
