'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    componentMessagesDefault = require('../../constants/defaults').componentMessages,
    MessagesActions = require('../../actions/subs/MessagesActions');


var ComponentMessageStore = Reflux.createStore({

  listenables: MessagesActions,

  init: function() {
    this.componentMessages = Im.Map(componentMessagesDefault);
  },

  getComponentMessages: function() {
    return this.componentMessages.toObject();
  },


  /* Listen MessagesActions
   ===============================*/
  setComponentMessages: function(messages) {
    this.componentMessages = messages ? Im.Map(messages)
                                      : Im.Map(componentMessagesDefault);
    this.trigger(this.componentMessages.toObject());
  },

  resetComponentMessages: function() {
    this.componentMessages = Im.Map(componentMessagesDefault);
    this.trigger(this.componentMessages.toObject());
  }

});

module.exports = ComponentMessageStore;
