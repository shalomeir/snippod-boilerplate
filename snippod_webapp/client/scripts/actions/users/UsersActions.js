/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var Reflux = require('reflux'),
    $ = require('jquery'),
    { requestGet, requestPost, requestPostForm }= require('../../utils/RESTCall'),
    MessagesActions = require('./../subs/MessagesActions');

var UsersActions = Reflux.createActions({

  // API GET actions
  'getUser': { asyncResult: true },

  // for guarrentee sequencial processing store update
  'clearUserStore': {}

});


/* API Get Actions
 ===============================*/
UsersActions.getUser.preEmit = function(userId, callback) {
  var action = '/accounts/'+userId+'/';
  requestGet(action,{},callback)
    .then(this.completed)
    .catch(this.failed);
};

module.exports = UsersActions;
