import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import $ from 'jquery';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { reduxForm } from 'redux-form';
import { defineMessages, FormattedMessage } from 'react-intl';

import { closeDialog, redirectPath } from 'ducks/application/application';

//Do not connect this action
import { login } from 'ducks/authentication/auth';
import { switchLangAndDeleteLanguageQuery } from 'ducks/application/application';

import loginValidation from './loginValidation';

const Styles = require('./DialogStyles');

const i18n = defineMessages({
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
  { closeDialog, redirectPath }
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
    router: PropTypes.object.isRequired,
    redirectPath: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,

    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
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
    if (!_.isEqual(this.props.values, nextProps.values) && !this.state.changed && nextProps.dirty) {
      this.setState({ changed: true });
    }
  }

  componentWillUpdate(nextProps) {
    if (!this.props.auth.loggedIn && nextProps.auth.loggedIn) {
      this._closeDialog();
    }
  }

  componentDidUpdate(prevProps) {
    //Show up general error message
    if (!prevProps.error && this.props.error && !$('.ui.general.error.message').transition('is visible')) {
      $('.ui.general.error.message')
        .transition('fade up');
    }

    //Hide general error message
    if (!_.isEqual(prevProps.values, this.props.values) && this.props.error) {
      $('.ui.general.error.message')
        .transition({
          animation: 'fade up',
          onHide: () => {this.props.initializeForm();},
          queue: false
        });
    }

    //Show up email ID Field error message
    if (this.props.fields.emailId.dirty && this.props.errors.emailId && !$('.ui.email.label').transition('is visible')) {
      $('.ui.email.pointing.label')
        .transition('fade up');
    }

    //Hide email ID Field error message
    if (prevProps.errors.emailId && !this.props.errors.emailId && $('.ui.email.label').transition('is visible')) {
      $('.ui.email.pointing.label')
        .transition('hide');
    }

    //Show up password Field error message
    if (this.props.fields.password.dirty && this.props.errors.password && !$('.ui.password.label').transition('is visible')) {
      $('.ui.password.pointing.label')
        .transition('fade up');
    }

    //Hide password Field error message
    if (prevProps.errors.password && !this.props.errors.password && $('.ui.password.label').transition('is visible')) {
      $('.ui.password.pointing.label')
        .transition('hide');
    }

  }

  _onSubmit(values, dispatch) {
    this.props.initializeForm();
    return new Promise((resolve, reject) => {
      dispatch(
        login(values)
      ).then((result) => {
        dispatch(switchLangAndDeleteLanguageQuery(result.account.language.split('-')[0]));
        this.props.redirectPath();
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

  render() {
    const { error, errors, fields: { emailId, password }, handleSubmit, invalid,
      submitting } = this.props;
    const { changed } = this.state;

    return (
      <div className="login dialog ui small modal" >
        <i className="close icon"></i>
        <h2 className="ui image header blue">
          <img src="images/logo.png" className="image" style={ Styles.logo }/>
          <div className="content">
            <FormattedMessage {...i18n.title} />
          </div>
        </h2>
        <form className={'ui large form content' + (invalid && changed ? ' error' : '')} onSubmit={handleSubmit(this._onSubmit)}>
          <div className="ui stacked segment">
            <div className={'field' + (emailId.invalid && changed ? ' error' : '') }>
              <div className="ui left icon email input">
                <i className="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" ref="emailId" {...emailId} />
              </div>
              <div className="ui email pointing red basic small label transition hidden" style={Styles.errorText}>
                {errors.emailId ? <FormattedMessage {...errors.emailId} /> : null}
              </div>
            </div>
            <div className={'field' + (password.invalid && changed ? ' error' : '') }>
              <div className="ui left icon password input">
                <i className="lock icon"></i>
                <input type="password" name="password" placeholder="Password" ref="password" {...password} />
              </div>
              <div className="ui password pointing red basic small label transition hidden" style={Styles.errorText}>
                {errors.password ? <FormattedMessage {...errors.password} /> : null}
              </div>
            </div>
            <button type="submit" className={'ui fluid large blue button' + (submitting ? ' loading' : '')}
                    disabled={submitting || invalid} >
              <FormattedMessage {...i18n.button} />
            </button>
          </div>
          <div className="ui general error message hidden" style={Styles.errorText}>
            {error}
          </div>
        </form>
        <div className="ui message">
          <FormattedMessage {...i18n.registerForwarding1} />&nbsp;
          <a><FormattedMessage {...i18n.registerForwarding2} /></a>
        </div>
      </div>
    );
  }
}
