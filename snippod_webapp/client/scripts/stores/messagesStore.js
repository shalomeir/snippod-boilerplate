'use strict';

var Reflux = require('reflux'),
    Immutable = require('immutable'),
    messagesDefaults = require('../constants/defaults').messages,
    messagesActions = require('../actions/messagesActions');


var MessagesStore = Reflux.createStore({

  listenables: messagesActions,

  init: function() {
    this.messages = Immutable.Map(messagesDefaults);
  },

  getMessages: function() {
    return this.messages.toObject();
  },

  /* Listen MessagesActions
   ===============================*/
  setMessages: function(messages) {
    this.messages= this.messages.merge(messages);
    this.trigger(this.messages.toObject());
  }

});

module.exports = MessagesStore;
