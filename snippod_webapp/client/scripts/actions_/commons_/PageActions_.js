'use strict';

var Reflux = require('reflux'),
    router = require('../../router');

var pageActions = Reflux.createActions({
  //by pass to store
  'setPage':{},
  'setReturnpage':{},
  'transitionToReturnpage':{}
});


module.exports = pageActions;
