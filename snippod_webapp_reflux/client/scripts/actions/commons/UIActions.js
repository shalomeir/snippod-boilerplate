/**
 * Created by shalomeir on 15. 3. 16..
 */
'use strict';

var Reflux = require('reflux');

var UIActions = Reflux.createActions({
  //from component to component directly.
  'showOverlay':{},
  'hideOverlay':{},
});


/* UI Actions
 ===============================*/


module.exports = UIActions;

