'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    globalMessagesDefault = require('../../constants/defaults').globalMessages,
    MessagesActions = require('../../actions/subs/MessagesActions');


var GlobalMessagesStore = Reflux.createStore({

  listenables: MessagesActions,

  init: function() {
    this.globalMessages = Im.Map(globalMessagesDefault);
  },

  getGlobalMessages: function() {
    return this.globalMessages.toObject();
  },


  /* Listen MessagesActions
   ===============================*/
  resetGlobalMessages: function() {
    this.globalMessages = Im.Map(globalMessagesDefault);
    this.trigger(this.globalMessages.toObject());
  },

  setGlobalMessages: function(messages) {
    messages = Im.Map(messages);
    this.globalMessages= this.globalMessages.merge(Im.Map(messages));
    this.trigger(this.globalMessages.toObject());
  },

  setLoginSuccessMessages: function(resData) {
    var msgs = Im.Map({
      success:'Login Success!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toObject());
  },

  setLoginErrorsMessages: function(resData) {
    var msgs = Im.Map({
      errors:'Login Failed!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toObject());
  },

  setRegisterSuccessMessages: function(resData) {
    var msgs = Im.Map({
      success:'Register ID Success!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toObject());
  },

  setUpdateSettingsSuccessMessages: function(resData) {
    var msgs = Im.Map({
      success:'Updated Your Information.'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toObject());
  },

  setUpdatePasswordSuccessMessages: function(resData) {
    var msgs = Im.Map({
      success:'Updated your Password'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toObject());
  }

});

module.exports = GlobalMessagesStore;
