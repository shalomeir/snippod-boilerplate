/**
*   Messages Component Description
*/

'use strict';

var React = require('react'),
    Reflux = require('reflux'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin,
    { PropTypes } = React,
    MessagesActions = require('../../actions/subs/MessagesActions'),
    GloabalMessagesStore = require('../../stores/subs/GlobalMessagesStore');

var Messages = React.createClass({

  mixins: [
    PureRenderMixin,
    Reflux.listenTo(GloabalMessagesStore,'onMessagesUpdate')
  ],

  getInitialState: function() {
    return {
      messages: GloabalMessagesStore.getGlobalMessages()
    };
  },

  onMessagesUpdate: function() {
    this.setState({
      messages: GloabalMessagesStore.getGlobalMessages()
    });

    setTimeout(function(){
      MessagesActions.resetGlobalMessages();
    }, 5000);
  },

  render: function() {
    var messages = this.state.messages;

    var getMessages = function(options) {
      if (messages && messages[options.key]) {
          return (
            /* jshint ignore:start */
            <div className={options.msgClass}>{messages[options.key]}</div>
            /* jshint ignore:end */
          );
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
