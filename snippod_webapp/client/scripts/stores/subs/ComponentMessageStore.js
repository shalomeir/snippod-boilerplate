'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    componentMessagesDefault = require('../../constants/defaults').componentMessages,
    MessagesActions = require('../../actions/subs/MessagesActions'),
    PostsActions = require('../../actions/posts/PostsActions'),
    UsersActions = require('../../actions/users/UsersActions');


var ComponentMessageStore = Reflux.createStore({

  listenables: [ MessagesActions, PostsActions, UsersActions ],

  init: function() {
    this.componentMessages = Im.Map(componentMessagesDefault);
  },

  getComponentMessages: function() {
    return this.componentMessages.toJS();
  },


  /* Listen MessagesActions
   ===============================*/
  setComponentMessages: function(messages) {
    this.componentMessages = messages ? Im.Map(messages)
                                      : Im.Map(componentMessagesDefault);
    this.trigger();
  },

  resetComponentMessages: function() {
    this.componentMessages = Im.Map(componentMessagesDefault);
    this.trigger();
  },

  /* Listen PostsActions
   ===============================*/
  onGetPostFailed: function(response) {
    this.componentMessages = this.componentMessages.set('failed',response.body);
    this.trigger();
  },

  onSubmitPostCompleted: function(response) {
    this.componentMessages = this.componentMessages.set('failed',null);
    this.trigger();
  },

  onSubmitPostFailed: function(response) {
    this.componentMessages = this.componentMessages.set('failed',response.body);
    this.trigger();
  },

  onSubmitCommentFailed: function(response) {
    this.componentMessages = this.componentMessages.set('failed',response.body);
    this.trigger();
  },

  onGetUserFailed: function(response) {
    this.componentMessages = this.componentMessages.set('failed',response.body);
    this.trigger();
  }



});

module.exports = ComponentMessageStore;
