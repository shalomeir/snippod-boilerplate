/**
 * Copyright 2013-2015, Seong-gyu Lee
 * All rights reserved.
 *
 */

'use strict';


var MessagesActions = require('../../actions/subs/MessagesActions');

/**
 * If react component will unmount, component Message will be reset and clear
 */
var ResetMessageAtWillUnmountMixin = {
  componentWillUnmount: function() {
    MessagesActions.resetComponentMessages();
  }
};

module.exports = ResetMessageAtWillUnmountMixin;
