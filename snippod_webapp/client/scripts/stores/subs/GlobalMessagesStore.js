'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    globalMessagesDefault = require('../../constants/defaults').globalMessages,
    MessagesActions = require('../../actions/subs/MessagesActions'),
    AuthAccountActions = require('../../actions/authentication/AuthAccountActions'),
    PostsActions = require('../../actions/posts/PostsActions');


var GlobalMessagesStore = Reflux.createStore({

  listenables: [ MessagesActions, AuthAccountActions, PostsActions ],

  init: function() {
    this.globalMessages = Im.Map(globalMessagesDefault);
  },

  getGlobalMessages: function() {
    return this.globalMessages.toJS();
  },


  /* Listen MessagesActions
   ===============================*/
  resetGlobalMessages: function() {
    this.globalMessages = Im.Map(globalMessagesDefault);
    this.trigger(this.globalMessages.toJS());
  },

  setGlobalMessages: function(messages) {
    messages = Im.Map(messages);
    this.globalMessages= this.globalMessages.merge(Im.Map(messages));
    this.trigger(this.globalMessages.toJS());
  },


  /* AuthAccount Actions
   ===============================*/
  onLoginCompleted: function(response) {
    var msgs = Im.Map({
      success:'Login Success!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  onLoginFailed: function(response) {
    var msgs = Im.Map({
      errors:'Login Failed!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  onRegisterCompleted: function(response) {
    var msgs = Im.Map({
      success:'Register ID Success!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  onDestroyCompleted: function(response) {
    var msgs = Im.Map({
      success:'Your account was deleted.'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  onUpdateSettingsCompleted: function(response) {
    var msgs = Im.Map({
      success:'Updated Your Information.'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  onUpdatePasswordCompleted: function(response) {
    var msgs = Im.Map({
      success:'Updated your Password'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  /* Posts Actions
   ===============================*/
  onSubmitPostCompleted: function(response) {
    var msgs = Im.Map({
      success:'Your Link post submission was Success!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  }

});

module.exports = GlobalMessagesStore;
