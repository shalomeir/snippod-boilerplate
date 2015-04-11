'use strict';

var Reflux = require('reflux'),
    messagesDefaults = require('../constants/defaults').messages,
    messagesActions = require('../actions/messagesActions');


var MessagesStore = Reflux.createStore({

  listenables: messagesActions,

  init: function() {
    this.messages = messagesDefaults;
  },

  getMessages: function() {
    return this.messages;
  },

  /* Listen MessagesActions
   ===============================*/
  setMessages: function(messages) {
    this.messages = messages;
    this.trigger(this.messages);
  }

});

module.exports = MessagesStore;
