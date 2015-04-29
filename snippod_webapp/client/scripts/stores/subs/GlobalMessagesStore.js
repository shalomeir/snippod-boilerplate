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

  setLoginSuccessMessages: function(resData) {
    var msgs = Im.Map({
      success:'Login Success!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  setLoginErrorsMessages: function(resData) {
    var msgs = Im.Map({
      errors:'Login Failed!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  setRegisterSuccessMessages: function(resData) {
    var msgs = Im.Map({
      success:'Register ID Success!'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  setUpdateSettingsSuccessMessages: function(resData) {
    var msgs = Im.Map({
      success:'Updated Your Information.'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  },

  setUpdatePasswordSuccessMessages: function(resData) {
    var msgs = Im.Map({
      success:'Updated your Password'
    });
    this.globalMessages = Im.Map(globalMessagesDefault).merge(msgs);
    this.trigger(this.globalMessages.toJS());
  }

});

module.exports = GlobalMessagesStore;
