/**
*   Messages Component Description
*/

'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    { PropTypes } = React,
    messagesStore = require('../../stores/messagesStore');

var Messages = React.createClass({

  mixins: [Reflux.listenTo(messagesStore,'onMessagesUpdate')],

  getInitialState: function() {
    return {
      messages: messagesStore.getMessages().overlayMessages
    };
  },

  onMessagesUpdate: function(messages) {
    this.setState({
      messages: messages
    });
  },

  render: function() {
    var messages = this.state.messages;

    var getMessages = function(options) {
      if (messages && messages[options.key]) {
        return messages[options.key].map(function(item, index) {
          return (
            /* jshint ignore:start */
            <div key={index} className={options.msgClass}>{item.msg}</div>
            /* jshint ignore:end */
          );
        });
      }
    };

    var errors = getMessages({key: 'errors', msgClass: 'error'});

    var info = getMessages({key: 'info', msgClass: 'info'});

    var success = getMessages({key: 'success', msgClass: 'success'});

    return (
      /* jshint ignore:start */
      <div className="messages">
        {errors}
        {info}
        {success}
      </div>
      /* jshint ignore:end */
    );
  },

  closeMessage: function(e) {
    e.preventDefault();
  }

});

module.exports = Messages;
