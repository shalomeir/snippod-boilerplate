import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import cx from 'classnames';
import {
  LoginModalWindow,
  RegisterModalWindow
} from 'containers';
import $ from 'jquery';
import { closeModalWindow } from 'ducks/application/application';


@connect(
  state => ({
    auth: state.auth,
    application: state.application
  }),
  { pushState, closeModalWindow }
)
export default class ModalWindow extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    closeModalWindow: PropTypes.func.isRequired
  };

  componentDidMount() {
    $(document).keyup(function(e) {
      if (e.keyCode === 27) { // esc
        e.preventDefault();
        this.props.closeModalWindow();
      }
    }.bind(this));
  }

  hideOverlayListener(e) {
    if (!this.isChildNodeOf(e.target, ['overlay-content'])) {
      this.props.closeModalWindow();
    }
  }

  render() {
    const overlayCx = cx({
      'md-overlay': true,
      'md-show': this.props.application.showOverlay
    });

    if (this.props.application.showOverlay) {
      const overlay = this.refs.overlay.getDOMNode();
      overlay.addEventListener('click', this.hideOverlayListener);
    }

    let overlayContent = <LoginModalWindow />;
    if (this.props.application.registerModalWindow) {
      overlayContent = <RegisterModalWindow />;
    }

    return (
      <div className={ overlayCx } ref="overlay">{ overlayContent }</div>
    );
  }
}

