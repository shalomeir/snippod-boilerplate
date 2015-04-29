'use strict';

var Reflux = require('reflux');

var MessagesActions = Reflux.createActions({
  'setGlobalMessages':{},
  'resetGlobalMessages':{},
  'setComponentMessages':{},
  'resetComponentMessages':{},

  //From AuthAccountActions
  'setLoginSuccessMessages':{},
  'setLoginErrorsMessages':{},
  'setRegisterSuccessMessages':{},
  'setUpdateSettingsSuccessMessages':{},
  'setUpdatePasswordSuccessMessages':{},

  //from action to current component directly
  'sendComponentMessages':{}

});

module.exports = MessagesActions;
