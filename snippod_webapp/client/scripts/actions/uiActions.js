/**
 * Created by shalomeir on 15. 3. 16..
 */
'use strict';

var Reflux = require('reflux'),
    router = require('../router');

var uiActions = Reflux.createActions({
  //from component to component directly.
  'showOverlay':{},
  'hideOverlay':{},
});


/* UI Actions
 ===============================*/


module.exports = uiActions;

