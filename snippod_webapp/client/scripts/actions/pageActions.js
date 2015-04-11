'use strict';

var Reflux = require('reflux'),
    assign = require('object-assign');

var pageActions = Reflux.createActions({
  //by pass to store
  'setPage':{},
  'setReturnpage':{}
});

module.exports = pageActions;
