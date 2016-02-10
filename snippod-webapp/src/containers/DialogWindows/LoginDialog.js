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
import { resetErrorMessage } from 'ducks/messages/errorMessage';

//Do not connect this action
import { login } from 'ducks/authentication/auth';
import { switchLangAndDeleteLanguageQuery } from 'ducks/application/application';
import { defineMessages, FormattedMessage } from 'react-intl';

import loginValidation from './loginValidation';

const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const TextField = require('material-ui/lib/text-field');

const Styles = require('./DialogStyles');

const messages = defineMessages({
  title: {
    id: 'loginDialog.title',
    defaultMessage: 'Log-in to your account'
  },
  button: {
    id: 'loginDialog.button',
    defaultMessage: 'Login'
  },
  registerForwarding1: {
    id: 'loginDialog.registerForwarding1',
    defaultMessage: 'New to us?'
  },
  registerForwarding2: {
    id: 'loginDialog.registerForwarding2',
    defaultMessage: 'Register'
  }
});

@connect(
  null,
  { pushState, closeDialog, resetErrorMessage }
)
@reduxForm({
  form: 'login',
  fields: ['emailId', 'password'],
  validate: loginValidation
})
@Radium
export default class LoginDialog extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,

    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    errors: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { changed: false };
    this._closeDialog = this._closeDialog.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    $('.ui.modal')
      .modal({
        detachable: false,
        onHidden: () => {
          this._closeDialog();
        }
      })
      .modal('show');
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.values, nextProps.values) && this.props.error) {
      this.props.initializeForm();
    }
    if (!_.isEqual(this.props.values, nextProps.values) && !this.state.changed) {
      this.setState({ changed: true });
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.auth.loggedIn && nextProps.auth.loggedIn) {
      this._closeDialog();
    }
  }

  _onSubmit(values, dispatch) {
    this.props.initializeForm();
    return new Promise((resolve, reject) => {
      dispatch(
        login(values)
      ).then((result) => {
        dispatch(switchLangAndDeleteLanguageQuery(result.account.language.split('-')[0]));
        resolve(result);
      }).catch((error) => {
        reject({ _error: error.message });
      });
    });
  }

  _closeDialog() {
    console.log('close login dialog');
    $('.ui.modal').modal('hide dimmer');
    this.props.closeDialog();
  }

  //_resetValueChanged() {
  //  this.setState({
  //    changed: false
  //  });
  //}

  render() {
    const { error, errors, fields: { emailId, password }, handleSubmit, invalid, dirty,
      submitting } = this.props;

    const { changed } = this.state;

    const errorMessages = (
      <ul className="list">
        {error ? (<li key="global error">{error}</li>) : null}
        {Object.keys(errors).map((value, index) => {
          const logMessage = errors[value];
          return <li key={index}>{value === 'emailId' ? 'ID' : value} : <FormattedMessage {...logMessage} /></li>;
        })}
      </ul>
    );

    return (
      <div className="login dialog ui small modal" >
        <i className="close icon"></i>
        <h2 className="ui image header blue">
          <img src="images/logo.png" className="image" style={ Styles.logo }/>
          <div className="content">
            <FormattedMessage {...messages.title} />
          </div>
        </h2>
        <form className={'ui large form content' + (invalid && changed ? ' error' : '')} onSubmit={handleSubmit(this._onSubmit)}>
          <div className="ui stacked segment">
            <div className={'field' + (emailId.invalid && changed ? ' error' : '') }>
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" ref="emailId" {...emailId} />
              </div>
            </div>
            <div className={'field' + (password.invalid && changed ? ' error' : '') }>
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" ref="password" {...password} />
              </div>
            </div>
            <button type="submit" className={'ui fluid large blue button' + (submitting ? ' loading' : '')}
                    disabled={submitting || invalid} >
              <FormattedMessage {...messages.button} />
            </button>
          </div>
          <div className="ui error message">
            {errorMessages}
          </div>
        </form>
        <div className="ui message">
          <FormattedMessage {...messages.registerForwarding1} />&nbsp;
          <a><FormattedMessage {...messages.registerForwarding2} /></a>
        </div>
      </div>
    );
  }
}
