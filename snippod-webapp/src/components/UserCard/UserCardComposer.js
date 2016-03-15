import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import $ from 'jquery';
import classNames from 'classnames';
import { shortenString } from 'utils/handleString';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';
import { reduxForm } from 'redux-form';

import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);

//Do not connect this action
import { updateAccountProfile } from 'ducks/authentication/auth';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';

import userValidation from './userValidation';

const radiumStyles = require('theme/RadiumStyles');
const styles = require('./UserCardStyles');

import i18nUserCard from 'i18nDefault/components/userCard';
const i18n = i18nUserCard;

@reduxForm({
  form: 'post',
  fields: ['username', 'description'],
  validate: userValidation
}, (state, props) => ({ // mapStateToProps
  initialValues: props.account // will pull props into form's initialValues
}))
@injectIntl
@Radium
export default class UserCardComposer extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    offEditingMode: PropTypes.func.isRequired,

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
    this._onSubmit = this._onSubmit.bind(this);
    this._closeEditor = this._closeEditor.bind(this);
  }

  componentDidUpdate(prevProps) {
    //Show up username Field error message
    if (this.props.fields.username.dirty && this.props.errors.username && !$('.ui.username.label').transition('is visible')) {
      $('.ui.username.pointing.label')
        .transition('fade up');
    }
    //Hide username Field error message
    if (prevProps.errors.username && !this.props.errors.username && $('.ui.username.label').transition('is visible')) {
      $('.ui.username.pointing.label')
        .transition('hide');
    }
    //Show up description Field error message
    if (this.props.fields.description.dirty && this.props.errors.description && !$('.ui.description.label').transition('is visible')) {
      $('.ui.description.pointing.label')
        .transition('fade up');
    }
    //Hide description Field error message
    if (prevProps.errors.description && !this.props.errors.description && $('.ui.description.label').transition('is visible')) {
      $('.ui.description.pointing.label')
        .transition('hide');
    }
  }

  _onSubmit(values, dispatch) {
    this.props.initializeForm();
    return new Promise((resolve, reject) => {
      dispatch(
        updateAccountProfile(Object.assign({}, { id: this.props.account.id }, values))
      ).then((response) => {
        const account = response.entities.accounts[response.result];
        dispatch(showDelayedToastMessage({
          type: 'info',
          title: toastMessages.updateUserCardTitle,
          body: Object.assign(toastMessages.updateUserCardBody, { values: { username: account.username } })
        }, 300));
        this._closeEditor(true);
        resolve(response);
      }).catch((error) => {
        const errors = {};
        if (error.errors.username) errors.username = error.errors.username[0];
        if (error.errors.description) errors.description = error.errors.description[0];
        if (error.message) errors._error = error.message;
        reject(errors);
      });
    });
  }

  _closeEditor(changed = false) {
    if (typeof changed === 'boolean' && changed) this.props.offEditingMode(changed);
    else this.props.offEditingMode(false);
  }

  render() {
    const { account, style, error, errors, fields: { username, description }, handleSubmit, invalid,
      submitting, intl: { formatMessage } } = this.props;
    const { changed } = this.state;

    const editCompleteButtons = (
      <div className={classNames('ui inverted basic buttons')} style={styles.editButtons}>
        <button className="ui button" onClick={this._closeEditor}>{formatMessage(i18n.cancel)}</button>
        <button className={classNames('ui submit blue button', { 'loading': submitting })}
                disabled={submitting || invalid} onClick={handleSubmit(this._onSubmit)}>
          <i className="save icon"/>{formatMessage(i18n.save)}
        </button>
      </div>
    );

    return (
      <div className="user-card ui secondary inverted grey padded text raised segment center aligned"
           style={[radiumStyles.raisedCardBoxShadow, radiumStyles.paddingBySize, style]}>
        {editCompleteButtons}
        <form className={classNames('ui large form content', { 'error': invalid })}
              ref="userCardForm" onSubmit={handleSubmit(this._onSubmit)} style={styles.form}>
          <div className={classNames('field', { 'error': username.invalid })}>
            <h2 className="ui header username grey inverted input" style={styles.username}>
              <span style={styles.at}>@</span>
              <input type="text" name="username" ref="username" {...username} style={styles.usernameInput}/>
            </h2>
            <div className="ui username pointing red basic small label transition hidden" style={styles.errorText}>
              { errors.username && errors.username.id ? <FormattedMessage {...errors.username} /> : errors.username ? errors.username : null}
            </div>
          </div>
          <i className="big icons" style={[radiumStyles.floatLeft, styles.userIcon]}>
            <i className="big thin circle icon"/>
            <i className="user icon"/>
          </i>
          <div className={classNames('field', { 'error': description.invalid })} style={styles.descriptionField}>
            <div className="ui description grey inverted input">
              <textarea type="text" name="description" rows="2"
                        placeholder="Introduce yourself" ref="description" {...description} style={styles.textArea} />
            </div>
            <div className="ui description pointing red basic small label transition hidden" style={styles.errorText}>
              { errors.description && errors.description.id ? <FormattedMessage {...errors.description} /> : errors.description ? errors.description : null}
            </div>
          </div>
          <div className="extra-infos extra content" style={styles.extraInfos}>
            <FormattedMessage {...i18n.language} /> : {account.language === 'ko' ? <FormattedMessage {...i18n.korean} /> : 'English'}
          </div>
        </form>
      </div>
    );
  }
}
