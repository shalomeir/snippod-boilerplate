import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import $ from 'jquery';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { pushState } from 'redux-router';
import { initializeWithKey } from 'redux-form';
import { reduxForm } from 'redux-form';

import { closeDialog } from 'ducks/application/application';
import { loginFromReduxForm } from 'ducks/authentication/auth';
import { resetErrorMessage } from 'ducks/messages/errorMessage';

import loginValidation from './loginValidation';

const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');

const Styles = require('./DialogStyles');


@connect(
  null,
  { pushState, closeDialog, resetErrorMessage, loginFromReduxForm }
)
@reduxForm({
  form: 'login',
  fields: ['emailId', 'password'],
  validate: loginValidation,
})
@Radium
export default class LoginDialog extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    loginFromReduxForm: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,

    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    errors: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { changed: false };
  }

  componentDidMount() {
    $('.ui.modal')
      .modal('show');
  }

  componentWillReceiveProps(nextProps) {
    //FIX ME: I coundn't find better way to fix style temporary.
    if (!_.isEqual(this.props.values, nextProps.values) && !this.state.changed
      && this.props.error) {
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

  //componentDidUpdate(prevProps) {
  //  if (!prevProps.application.isShowOverlay && this.props.application.isShowOverlay
  //    && this.props.application.loginDialog) {
  //    this.autoFocus();
  //  }
  //}

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

  render() {
    const { error, errors, fields: { emailId, password }, handleSubmit, invalid,
      submitting } = this.props;

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
      </div>
    );

    const errorMessages = (
      <ul className="list">
        {error ? error : null}
        {Object.keys(errors).map((value, index) => {
          return <li key={index}>value : {errors[value]}</li>;
        })}
      </ul>
    );

    return (
      <div className="login dialog ui small modal" style={ Styles.dialog }>
        <i className="close icon"></i>
        <h2 className="ui image header">
          <img src="images/logo.png" className="image" />
            <div className="content">
              Log-in to your account
            </div>
        </h2>
        <form className={'ui large form content' + (invalid ? ' error' : '')}
              onSubmit={handleSubmit(loginFromReduxForm)}>
          <div className="ui stacked segment">
            <div className={'field' + (emailId.invalid ? ' error' : '') }>
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" ref="emailId" {...emailId} />
              </div>
            </div>
            <div className={'field' + (password.invalid ? ' error' : '') }>
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" ref="password" {...password} />
              </div>
            </div>
            <button className="ui fluid large blue submit button" disabled={submitting} >Login</button>
          </div>
          <div className="ui error message">
            {errorMessages}
          </div>
        </form>
        <div className="actions">
          <div className="ui black deny button">
            Nope
          </div>
          <div className="ui positive right labeled icon button">
            Yep, that's me
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    );
  }
}
