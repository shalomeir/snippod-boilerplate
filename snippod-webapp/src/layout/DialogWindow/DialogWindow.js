import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import head from 'constants/head';
import { connect } from 'react-redux';
//import { pushState } from 'redux-router';
import {
  LoginDialog,
  RegisterDialog
} from 'containers';
//import { closeDialog } from 'ducks/application/application';

const meta = { ...head,
  title: 'Snippod : '
};

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
    let helmet = null;

    if (this.props.application.isShowOverlay && this.props.application.loginDialog) {
      const tmeta = { ...meta, title: meta.title + 'Login' };
      helmet = (
        <Helmet {...tmeta}/>
      );
    } else if (this.props.application.isShowOverlay && this.props.application.registerDialog) {
      const tmeta = { ...meta, title: meta.title + 'Register' };
      helmet = (
        <Helmet {...tmeta}/>
      );
    }

    return (
      <div className="dialog-window">
        {helmet}
        <LoginDialog />
        <RegisterDialog />
      </div>
    );
  }
}
