'use strict';

var Reflux = require('reflux'),
    assign = require('object-assign');

var messagesActions = Reflux.createActions({
  //by pass to store
  'setMessages':{},
  'setError':{}
});

module.exports = messagesActions;
