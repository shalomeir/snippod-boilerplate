import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';
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
  state => ({application: state.application})
)
export default class DialogWindow extends Component {

  static propTypes = {
    //auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    //pushState: PropTypes.func.isRequired,
    //closeDialog: PropTypes.func.isRequired
  };

  render() {
    let documentMeta = null;

    if (this.props.application.isShowOverlay && this.props.application.loginDialog) {
      const tmeta = { ...meta, title: meta.title + 'Login'};
      documentMeta = (
        <DocumentMeta {...tmeta}/>
      );
    } else if (this.props.application.isShowOverlay && this.props.application.registerDialog) {
      const tmeta = { ...meta, title: meta.title + 'Register'};
      documentMeta = (
        <DocumentMeta {...tmeta}/>
      );
    }

    return (
      <div className="dialog-window">
        {documentMeta}
        <LoginDialog />
        <RegisterDialog />
      </div>
    );
  }
}

