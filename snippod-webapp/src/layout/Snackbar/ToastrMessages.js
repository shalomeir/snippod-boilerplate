const debug = require('utils/getDebugger')('ToastrMessages');

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { defineMessages, FormattedMessage } from 'react-intl';
import { ToastContainer, ToastMessage } from 'react-toastr';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import { resetToastMessagesComplete } from 'ducks/messages/toastMessage';

const styles = require('./ToastrMessagesStyles');

const i18n = defineMessages({
  testMessage: {
    id: 'layout.toastrMessages.testMessage',
    defaultMessage: 'Toast is pop up message!'
  }
});

@connect(
  null,
  { resetToastMessagesComplete }
)
@Radium
export default class ToastrMessages extends Component {

  static propTypes = {
    resetToastMessagesComplete: PropTypes.func.isRequired,
    messages: PropTypes.shape({
      errorMessage: PropTypes.object,
      toastMessages: PropTypes.object,
      toastMessage: PropTypes.shape({
        toastObject: PropTypes.object,
        toastNum: PropTypes.number,
        resetToast: PropTypes.bool
      }),
      error: PropTypes.string,
      info: PropTypes.string,
      success: PropTypes.string,
      warning: PropTypes.string
    }).isRequired
  };

  constructor() {
    super();
    this.state = { toastNum: 0 };
    this._addToast = this._addToast.bind(this);
    this._clearToasts = this._clearToasts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.toastNum < nextProps.messages.toastMessage.toastNum) {
      this._addToast(nextProps.messages.toastMessage.toastObject);
      this.setState({ toastNum: this.state.toastNum + 1 });
    }

    if (this.props.messages.errorMessage !== nextProps.messages.errorMessage) {
      this._addToast(nextProps.messages.errorMessage);
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.toastMessage.resetToast === true) {
      this._clearToasts();
      this.props.resetToastMessagesComplete();
    }
  }

  componentWillUnmount() {
    this.props.resetToastMessagesComplete();
  }

  _addToast(message) {
    const defaultToastOption = {
      closeButton: true,
      showAnimation: 'animated fadeInUp', // or other animations from animate.css
      hideAnimation: 'animated fadeOutDown',
      closeAnimation: 'animated fadeOutDown',
      timeOut: 5000,
      extendedTimeOut: 3000
    };

    if (message.errorObject) {
      //debug messages
      const errorStatus = message.errorObject.status;
      if (errorStatus === 'Unauthorized' || errorStatus === 'Bad request') {
        debug('Error Occured: ' + message.errorObject.message);
      } else {
        this.refs.toastContainer.error(message.errorObject.message, 'Error Occured', defaultToastOption);
      }
    // Main Toast Popup
    } else {
      const messageBody = (<FormattedMessage {...message.body}/>);
      const messageTitle = (<FormattedMessage {...message.title}/>);

      if (message.type === 'success') {
        this.refs.toastContainer.success(messageBody, messageTitle, defaultToastOption);
      } else if (message.type === 'info') {
        this.refs.toastContainer.info(messageBody, messageTitle, defaultToastOption);
      } else if (message.type === 'error') {
        this.refs.toastContainer.error(messageBody, messageTitle, defaultToastOption);
      } else if (message.type === 'warning') {
        this.refs.toastContainer.warning(messageBody, messageTitle, defaultToastOption);
      } else {
        debug('Message not captured by toastr \n title: ' + messageTitle + '\n body: ' + messageBody);
      }
    }
  }

  _clearToasts() {
    this.refs.toastContainer.clear();
  }

  render() {
    return (
      <section className="layout toastr">
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="toastContainer"
          className="toast-bottom-left" />
      </section>
    );
  }
}
