import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
//import { pushState } from 'redux-router';
import {
  LoginDialog,
  RegisterDialog
} from 'containers';
//import { closeDialog } from 'ducks/application/application';


@connect(
  state => ({ application: state.application })
)
export default class DialogWindow extends Component {

  static propTypes = {
    //auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    //pushState: PropTypes.func.isRequired,
    //closeDialog: PropTypes.func.isRequired
  };

  render() {
    let titleText = null;

    if (this.props.application.isShowOverlay && this.props.application.loginDialog) {
      titleText = 'Login';
    } else if (this.props.application.isShowOverlay && this.props.application.registerDialog) {
      titleText = 'Register';
    }

    return (
      <div className="layout">
        <Helmet title={titleText} />
        <LoginDialog />
        <RegisterDialog />
      </div>
    );
  }
}
