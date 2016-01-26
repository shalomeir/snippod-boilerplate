import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { initializeWithKey } from 'redux-form';
import { reduxForm } from 'redux-form';

import { closeDialog } from 'ducks/application/application';
import { login } from 'ducks/authentication/auth';
import { resetErrorMessage } from 'ducks/messages/errorMessage';

import loginValidation from './loginValidation';

const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');

const Styles = require('./DialogStyles');

@connect(
  state => ({
    auth: state.auth,
    application: state.application,
    errorObject: state.messages.errorObject,
  }),
  { pushState, closeDialog, login, resetErrorMessage })
@reduxForm({
  form: 'login',
  fields: ['emailId', 'password'],
  validate: loginValidation,
  //onSubmit: login
})
@Radium
export default class LoginDialog extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    errorObject: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,

    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { changed: false };
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //FIX ME: I coundn't find better way to fix style temporary.
    if (!_.isEqual(this.props.values, nextProps.values) && !this.state.changed
      && this.props.errorObject) {
      this.setState({
        changed: true
      });
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.auth.loggedIn && nextProps.auth.loggedIn) {
      this.props.closeDialog();
      this.props.resetForm();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.application.isShowOverlay && this.props.application.isShowOverlay
      && this.props.application.loginDialog) {
      this.autoFocus();
    }
  }

  resetValueChanged() {
    this.setState({
      changed: false
    });
  }

  autoFocus() {
    if (this.props.fields.emailId.invalid) {
      this.refs.emailId.focus();
      return null;
    } else if (this.props.fields.password.invalid) {
      this.refs.password.focus();
      return null;
    } else if (this.props.invalid) {
      this.refs.emailId.focus();
      return null;
    }

    //TODO: I couldn't this. Also I couldn't do remotely Click Event.
    //(for entering in input field to show click submit button event')
    //this.refs.submitButton.focus();

  }

  loginSubmit(values, dispatch) {
    this.props.resetErrorMessage();
    this.resetValueChanged();

    //FIX ME: I coundn't make it pefectly.
    //This make 'Unhandled promise rejection issue'
    return this.props.login(values).then(result => {
      if (result && typeof result.error === 'object') {
        return Promise.reject({
          _error: result.error.message
        });
      }
    });
  }

  render() {
    const { application, errorObject, fields: { emailId, password }, handleSubmit, invalid,
      submitting, values } = this.props;

    const changed = this.state.changed ? 'changed' : 'init';

    const loginForm = (
      <div>
        <TextField
          ref="emailId"
          autofocus="autofocus"
          floatingLabelText="Email ID"
          hintText="Type your email ID."
          errorText={emailId.error && emailId.touched ? emailId.error : ''}
          onEnterKeyDown={ handleSubmit(this.loginSubmit) }
          {...emailId} />
        <br/>
        <TextField
          ref="password"
          floatingLabelText="Password"
          hintText="Password"
          errorText={password.error && password.touched ? password.error : ''}
          onEnterKeyDown={ handleSubmit(this.loginSubmit) }
          type="password"
          {...password} />
        <br/><br/>
        <div ref="errorText" style={[Styles.errorText.init, Styles.errorText[changed]]}>
          {errorObject ? this.props.errorObject.message : ''}
        </div>
      </div>
    );

    const dialogActions = [
      <FlatButton key="cancelButton"
        label="Cancel"
        onTouchTap={ this.props.closeDialog } />,
      <FlatButton key="submitButton"
        ref="submitButton"
        label="Submit"
        primary
        onTouchTap={ handleSubmit(this.loginSubmit) } />
    ];

    return (
      <div className="login-dialog container">
        <Dialog
          contentStyle={Styles.loginDialog}
          bodyStyle={Styles.dialogBodyStyle}
          title="Login"
          actions={dialogActions}
          actionFocus="emailId"
          open={application.isShowOverlay && application.loginDialog}
          onRequestClose={this.props.closeDialog}
          children={loginForm} />
      </div>
    );
  }
}
