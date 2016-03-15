import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import _ from 'lodash';
import $ from 'jquery';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { reduxForm } from 'redux-form';

//Do not connect this action
import { updateAccountSettings, updateAccountPassword, deleteAccountAndFollow } from 'ducks/authentication/auth';
import { switchLangAndDeleteLanguageQuery } from 'ducks/application/application';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';

import { LanguageDropdown, ConfirmCheckModal } from 'components';

import settingValidation from './settingValidation';

const radiumStyles = require('theme/RadiumStyles');
const styles = require('./SettingStyles');

const i18n = defineMessages({
  header: {
    id: 'setting.header',
    defaultMessage: 'Setting'
  },

  subHeader: {
    id: 'setting.subHeader',
    defaultMessage: 'Setup your language or change your password.'
  },

  language: {
    id: 'setting.language',
    defaultMessage: 'Language'
  },

  myLanguage: {
    id: 'setting.myLanguage',
    defaultMessage: 'My Language'
  },

  password: {
    id: 'setting.password',
    defaultMessage: 'Password'
  },

  confirmPassword: {
    id: 'setting.confirmPassword',
    defaultMessage: 'Confirm Password'
  },

  changePassword: {
    id: 'setting.changePassword',
    defaultMessage: 'Change password'
  },

  changePasswordButton: {
    id: 'setting.changePasswordButton',
    defaultMessage: 'Submit'
  },

  deleteAccount: {
    id: 'setting.deleteAccount',
    defaultMessage: 'Delete account'
  },

  confirmCheckModalHeader: {
    id: 'setting.confirmCheckModalHeader',
    defaultMessage: 'Delete My Account'
  },

  confirmCheckModalDescription: {
    id: 'setting.confirmCheckModalDescription',
    defaultMessage: 'Are you sure you want to delete this account?'
  },


});

@connect(
  createSelector([
    state => state.auth,
  ], (auth) => {
    return { auth };
  }),
  { updateAccountSettings, showDelayedToastMessage, switchLangAndDeleteLanguageQuery, deleteAccountAndFollow }
)
@reduxForm({
  form: 'setting',
  fields: ['password', 'confirmPassword'],
  validate: settingValidation
})
@injectIntl
@Radium
export default class Setting extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    updateAccountSettings: PropTypes.func.isRequired,
    showDelayedToastMessage: PropTypes.func.isRequired,
    switchLangAndDeleteLanguageQuery: PropTypes.func.isRequired,
    deleteAccountAndFollow: PropTypes.func.isRequired,

    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      isFetching: false,
      passwordFormChanged: false,
      showCheckModal: false
    };
    this._changePasswordSubmit = this._changePasswordSubmit.bind(this);
    this._resetForm = this._resetForm.bind(this);
    this.changeAccountLanguage = this.changeAccountLanguage.bind(this);
    this.onShowCheckModal = this.onShowCheckModal.bind(this);
    this.onCloseCheckModal = this.onCloseCheckModal.bind(this);
    this.onConfirmCheckModal = this.onConfirmCheckModal.bind(this);
  }

  componentDidMount() {
    $('.ui.settings.accordion')
      .accordion({
        selector: {
          trigger: '.title.setting.header'
        }
      })
    ;
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.values, nextProps.values) && !this.state.changed && nextProps.dirty) {
      this.setState({ passwordFormChanged: true });
    }
  }

  componentDidUpdate(prevProps) {
    //Show up general error message
    if (!prevProps.error && this.props.error && !$('#register-general-error-message').transition('is visible')) {
      $('#register-general-error-message')
        .transition('fade up');
    }
    //Hide general error message
    if (!_.isEqual(prevProps.values, this.props.values) && this.props.error) {
      $('#register-general-error-message')
        .transition({
          animation: 'fade up',
          onHide: () => {this.props.initializeForm();},
          queue: false
        });
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

    //Show up confirmPassword Field error message
    if (this.props.fields.confirmPassword.dirty && this.props.errors.confirmPassword && !$('.ui.confirmPassword.label').transition('is visible')) {
      $('.ui.confirmPassword.pointing.label')
        .transition('fade up');
    }
    //Hide confirmPassword Field error message
    if (prevProps.errors.confirmPassword && !this.props.errors.confirmPassword && $('.ui.confirmPassword.label').transition('is visible')) {
      $('.ui.confirmPassword.pointing.label')
        .transition('hide');
    }
  }

  onShowCheckModal() {
    this.setState({
      showCheckModal: true
    });
  }

  onCloseCheckModal() {
    this.setState({
      showCheckModal: false
    });
  }

  onConfirmCheckModal() {
    this.props.deleteAccountAndFollow();
  }

  changeAccountLanguage(lang) {
    this.props.updateAccountSettings({ id: this.props.auth.account.id, language: lang })
      .then((response) => {
        const account = response.entities.accounts[response.result];
        this.props.showDelayedToastMessage({
          type: 'info',
          title: toastMessages.changeLanguageTitle,
          body: toastMessages.changeLanguageBody
        }, 300);
        this.props.switchLangAndDeleteLanguageQuery(account.language.split('-')[0]);
      }).catch((error) => {
        console.log(error);
      })
    ;
  }

  _changePasswordSubmit(values, dispatch) {
    this.props.initializeForm();
    return new Promise((resolve, reject) => {
      dispatch(
        updateAccountPassword(Object.assign({ id: this.props.auth.account.id }, values))
      ).then((response) => {
        this._resetForm();
        dispatch(showDelayedToastMessage({
          type: 'info',
          title: toastMessages.changePasswordTitle,
          body: toastMessages.changePasswordBody
        }, 300));
        resolve(response);
      }).catch((error) => {
        const errors = {};
        if (error.errors.password) errors.password = error.errors.password[0];
        if (error.errors.confirmPassword) errors.confirmPassword = error.errors.confirmPassword[0];
        if (error.message) errors._error = error.message;
        reject(errors);
      });
    });
  }

  _resetForm() {
    this.props.resetForm();
    this.setState({ passwordFormChanged: false });
  }

  render() {
    const { auth, intl: { formatMessage },
      error, errors, fields: { password, confirmPassword }, handleSubmit, invalid,
      submitting } = this.props;
    const { isFetching, passwordFormChanged } = this.state;

    if (auth.loggedIn === false) {
      return (
        <div className="setting ui text container main-container">
          <Helmet title="Setting" />
        </div>
      );
    }

    const settingLanguage = (
      <div className="ui compact segment" style={styles.settingSegment}>
        <label style={styles.settingLabel}><FormattedMessage {...i18n.myLanguage} /></label>
        <LanguageDropdown lang={auth.account.language.split('-')[0]} changeLang={this.changeAccountLanguage} className="setting"/>
      </div>
    );

    const settingChangePassword = (
      <form className={classNames('ui large form content', { 'error': (invalid && passwordFormChanged) })}
            onSubmit={handleSubmit(this._changePasswordSubmit)}>
        <div className="ui segment" style={styles.settingSegment}>
          <div className={classNames('field', { 'error': (password.invalid && passwordFormChanged) })}>
            <label><FormattedMessage {...i18n.password} /></label>
            <div className="ui left icon password input">
              <i className="lock icon" />
              <input type="password" name="password" placeholder="Password" ref="password" {...password} />
            </div>
            <div className="ui password pointing red basic small label transition hidden" style={styles.errorText}>
              { errors.password && errors.password.id ? <FormattedMessage {...errors.password} /> : errors.password ? errors.password : null}
            </div>
          </div>
          <div className={classNames('field', { 'error': (confirmPassword.invalid && passwordFormChanged) })}>
            <label><FormattedMessage {...i18n.confirmPassword} /></label>
            <div className="ui left icon confirmPassword input">
              <i className="lock icon" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" ref="confirmPassword" {...confirmPassword} />
            </div>
            <div className="ui confirmPassword pointing red basic small label transition hidden" style={styles.errorText}>
              { errors.confirmPassword && errors.confirmPassword.id ? <FormattedMessage {...errors.confirmPassword} /> : errors.confirmPassword ? errors.confirmPassword : null}
            </div>
          </div>
          <button type="submit" className={classNames('ui fluid large blue button', { 'loading': submitting })}
                  disabled={submitting || invalid} onClick={handleSubmit(this._changePasswordSubmit)}>
            <FormattedMessage {...i18n.changePasswordButton} />
          </button>
        </div>
        <div id="register-general-error-message" className="ui general error message hidden" style={styles.errorText}>
          {error}
        </div>
      </form>
    );

    const confirmCheckModalIconCom = (
      <i className="remove circle outline icon" style={styles.confirmIcon} />
    );

    const settingDeleteAccount = (
      <div className="ui basic center aligned segment" style={styles.settingSegment}>
        <button className="ui red big button" type="button"
             onClick={this.onShowCheckModal}>
          <i className="remove user icon"/>
          {formatMessage(i18n.deleteAccount)}
        </button>
        <ConfirmCheckModal key="setting-delete-account-confirm-check-modal"
                           id="setting-delete-account-confirm-check-modal"
                           showOn={this.state.showCheckModal}
                           header={formatMessage(i18n.confirmCheckModalHeader)}
                           description={formatMessage(i18n.confirmCheckModalDescription)}
                           iconDom={confirmCheckModalIconCom}
                           onClose={this.onCloseCheckModal}
                           onConfirm={this.onConfirmCheckModal}/>
      </div>
    );

    const settingDom = (
      <div className="ui styled fluid settings accordion">
        <div className="title ui setting header active" style={styles.settingHeader}>
          <i className="dropdown icon"/>
          {formatMessage(i18n.language)}
        </div>
        <div className="content active">
          {settingLanguage}
        </div>
        <div className="title ui setting header" style={styles.settingHeader}>
          <i className="dropdown icon"/>
          {formatMessage(i18n.changePassword)}
        </div>
        <div className="content">
          {settingChangePassword}
        </div>
        <div className="title ui setting header" style={styles.settingHeader}>
          <i className="dropdown icon"/>
          {formatMessage(i18n.deleteAccount)}
        </div>
        <div className="content">
          {settingDeleteAccount}
        </div>
      </div>
    );

    return (
      <div className="setting ui text container main-container">
        <Helmet title="Setting" />
        <h1 className="ui header">
          {formatMessage(i18n.header)}
          <div className="sub header">
            {formatMessage(i18n.subHeader)}
          </div>
        </h1>
        {settingDom}
      </div>
    );
  }
}
