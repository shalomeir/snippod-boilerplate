import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import $ from 'jquery';
import classNames from 'classnames';

const styles = require('./PopupModalWindowStyles');

export default class PopupModalWindow extends Component {

  static propTypes = {
    children: PropTypes.object,
    router: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this._closePopupModal = this._closePopupModal.bind(this);
    this._returnToBaseLocation = this._returnToBaseLocation.bind(this);
    this._captureAndFireReturnEvent = this._captureAndFireReturnEvent.bind(this);
  }

  componentDidMount() {
    $('#popup-modal-window')
      .modal({
        context: $('#full-screen'),
        dimmerSettings: {
          duration: {
            show: 400,
            hide: 300
          },
          opacity: 0.8,
        },
        onHidden: this._returnToBaseLocation
      })
    ;
  }

  //Close popup modal window
  componentWillReceiveProps(nextProps) {
    if (this.props.application.isShowModal && !nextProps.application.isShowModal) {
      this._closePopupModal();
    }
  }

  //Open popup modal window
  componentDidUpdate(prevProps) {
    if (!prevProps.application.isShowModal && this.props.application.isShowModal) {
      $('#popup-modal-window')
        .modal('show');
    }
  }

  _closePopupModal() {
    console.log('close popup modal window');
    $('#popup-modal-window')
      .modal('hide')
      .modal('hide dimmer');
  }

  _returnToBaseLocation() {
    if (this.props.application.isShowModal) {
      this.props.router.push(this.props.application.returnTo);
    }
  }

  _captureAndFireReturnEvent(event) {
    if (event) {
      const clickedDomId = event.target.id;
      if (clickedDomId === 'popup-modal-window-inner-container' ||
        clickedDomId === 'capture-and-fire'
      ) {
        this._returnToBaseLocation();
      }
    }
  }

  render() {

    return (
      <div id="popup-modal-window" key="popup-modal-window" className="ui long modal" onClick={this._captureAndFireReturnEvent} >
        <i id="popup-modal-window-close-button" className="close icon" />
        <div id="popup-modal-window-inner-container" className="content">
          {this.props.children ? this.props.children : null}
        </div>
      </div>
    );
  }
}
