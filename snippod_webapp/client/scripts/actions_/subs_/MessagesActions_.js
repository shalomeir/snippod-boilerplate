'use strict';

var Reflux = require('reflux');

var MessagesActions = Reflux.createActions({
  'setGlobalMessages':{},
  'resetGlobalMessages':{},
  'setComponentMessages':{},
  'resetComponentMessages':{},

  //from action to current component directly
  'sendComponentMessages':{}

});

module.exports = MessagesActions;
