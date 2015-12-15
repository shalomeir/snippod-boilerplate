import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import {initializeWithKey} from 'redux-form';
import {reduxForm} from 'redux-form';

import { closeDialog } from 'ducks/application/application';
import { login } from 'ducks/authentication/auth';

import loginValidation from './loginValidation';

const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');

const Styles = require('./DialogStyles');

@Radium
@connect(
  state => ({
    auth: state.auth,
    application: state.application
  }),
  { pushState, closeDialog, login })
@reduxForm({
  form: 'login',
  fields: ['emailId', 'password'],
  validate: loginValidation,
  //onSubmit: login
})
export default class LoginDialog extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    application: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,

    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    error: PropTypes.string,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {errorText: ''};
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.application.isShowOverlay && !prevProps.application.isShowOverlay
        && this.props.application.loginDialog) {
      this.autoFocus();
    }

    //FIX ME: I coundn't find better way to fix style temporary.
    if (this.props.error && !this.state.errorText) {
      this.setErrorText(this.props.error);
    }
    //FIX ME: I coundn't find better way to fix style temporary.
    if (this.refs.errorText && this.refs.errorText.style.color === 'rgb(244, 67, 54)') {
      this.refs.errorText.style.color = Styles.errorText.blur.color;
    }
    //FIX ME: I coundn't find better way to fix style temporary.
    if (!this.props.error && this.state.errorText) {
      this.resetErrorText();
    }

    if (this.props.auth.loggedIn && !prevProps.auth.loggedIn) {
      this.props.closeDialog();
      this.props.resetForm();
    }
  }

  setErrorText(error) {
    this.setState({
      errorText: error
    });
  }

  resetErrorText() {
    this.setState({
      errorText: ''
    });
  }

  autoFocus() {
    const app = this.props.application;
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
    this.refs.submitButton.focus();
  }

  loginSubmit(values, dispatch) {
    //FIX ME: I coundn't find better way to fix style temporary.
    this.resetErrorText();

    //FIX ME: I coundn't make it pefectly.
    //This make 'Unhandled promise rejection issue'
    return this.props.login(values).then(result => {
      if (result && typeof result.error === 'object') {
        const resultError = result.error;
        return Promise.reject({
          ...resultError,
          _error: result.error.message
        });
      }
    });
  }

  render() {
    const { application, fields: {emailId, password}, handleSubmit, invalid,
      pristine, submitting, values } = this.props;

    const loginForm = (
      <div>
        <TextField
          ref="emailId"
          autofocus="autofocus"
          floatingLabelText="Email ID"
          hintText="Type your email ID."
          errorText={emailId.error && emailId.touched ? emailId.error : ''}
          onEnterKeyDown={ handleSubmit(this.loginSubmit) }
          {...emailId}
        />
        <br/>
        <TextField
          ref="password"
          floatingLabelText="Password"
          hintText="Password"
          errorText={password.error && password.touched ? password.error : ''}
          onEnterKeyDown={ handleSubmit(this.loginSubmit) }
          type="password"
          {...password}
        />
        <br/><br/>
        {this.state.errorText && <div ref="errorText" style={Styles.errorText.init}> {this.state.errorText} </div> }
      </div>
    );

    const dialogActions = [
      <FlatButton key="cancelButton"
        label="Cancel"
        onTouchTap={this.props.closeDialog}/>,
      <FlatButton key="submitButton"
                  ref="submitButton"
        label="Submit"
        primary
        onTouchTap={ handleSubmit(this.loginSubmit) }/>
    ];

    return (
      <div className="login-dialog">
        <Dialog
          contentStyle={Styles.loginDialog}
          bodyStyle={Styles.dialogBodyStyle}
          title="Login"
          actions={dialogActions}
          actionFocus="emailId"
          open={application.isShowOverlay && application.loginDialog}
          onRequestClose={this.props.closeDialog}
          children={loginForm}/>
      </div>
    );
  }
}
