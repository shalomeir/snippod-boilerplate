import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {
  LoginDialog,
  RegisterDialog
} from 'containers';

export default class DialogWindow extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
  };

  render() {
    let titleText;
    let onboardDialog;
    let onboardsDialogs = null;

    if (this.props.application.loginDialog) {
      titleText = 'Login';
      onboardDialog = <LoginDialog auth={this.props.auth} />;
    } else if (this.props.application.registerDialog) {
      titleText = 'Register';
      onboardDialog = <RegisterDialog auth={this.props.auth} />;
    }

    if (this.props.application.isShowOverlay) {
      onboardsDialogs = (
        <div className="layout onboards show-overlay">
          <Helmet title={titleText} />
          {onboardDialog}
        </div>
      );
    }

    return onboardsDialogs;
  }
}
