'use strict';

var Reflux = require('reflux');

var pageActions = Reflux.createActions({
  //by pass to store
  'setPage':{},
  'setReturnpage':{},
  'resetReturnpage':{},
  'transitionToReturnpage':{}
});


module.exports = pageActions;
