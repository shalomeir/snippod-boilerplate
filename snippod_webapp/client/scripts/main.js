'use strict';

var React = require('react'),
    router = require('./router'),
    messagesActions = require('./actions/messagesActions'),
    uiActions = require('./actions/uiActions');

var attachFastClick = require('fastclick');


/* jshint ignore:start */
router.run((Handler, state) => {
  // Clear out any existing messages
  messagesActions.setMessages({});
  uiActions.hideOverlay();

  React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
});
/* jshint ignore:end */

// fastclick eliminates 300ms click delay on mobile
attachFastClick(document.body);
