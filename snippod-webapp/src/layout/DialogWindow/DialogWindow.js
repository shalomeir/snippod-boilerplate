import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {
  LoginDialog,
  RegisterDialog
} from 'containers';

export default class DialogWindow extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired
  };

  render() {
    const { auth, application } = this.props;

    let titleText;
    let onboardDialog;
    let onboardsDialogs = null;

    if (application.loginDialog) {
      titleText = 'Login';
      onboardDialog = <LoginDialog auth={auth} />;
    } else if (application.registerDialog) {
      titleText = 'Register';
      onboardDialog = <RegisterDialog auth={auth} />;
    }

    if (application.isShowOverlay) {
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
