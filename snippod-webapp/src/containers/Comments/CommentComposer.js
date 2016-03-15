import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import _ from 'lodash';
import { throttle } from 'lodash-decorators';
import $ from 'jquery';
import classNames from 'classnames';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { reduxForm } from 'redux-form';

import MediaQuery from 'react-responsive';

//Do not connect this action
import { submitComment, insertCommentToCommentsPagination } from 'ducks/postings/comments';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';

import commentValidation from './commentValidation';

import { showLoginDialog } from 'ducks/application/application';

import responsivePoint from 'theme/semantic-variables';

const i18n = defineMessages({
  contentPlaceHolder: {
    id: 'commentComposer.contentPlaceHolder',
    defaultMessage: 'Type comment'
  },

  button: {
    id: 'commentComposer.button',
    defaultMessage: 'Add Reply'
  },

  loginButton: {
    id: 'commentComposer.loginButton',
    defaultMessage: 'Login first'
  },

});

const styles = require('./CommentComposerStyles');

@connect(
  null,
  { showLoginDialog }
)
@reduxForm({
  form: 'post',
  fields: ['content'],
  validate: commentValidation
})
@injectIntl
@Radium
export default class CommentComposer extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    style: PropTypes.object,
    postId: PropTypes.number.isRequired,
    loadPost: PropTypes.func,
    intl: intlShape.isRequired,
    showLoginDialog: PropTypes.func.isRequired,

    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    errors: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { changed: false };
    this._submitComment = this._submitComment.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._resetForm = this._resetForm.bind(this);
  }

  componentDidMount() {
    if (!this.props.auth.loggedIn) {
      $('.comment-composer-form').dimmer({
        on: 'hover'
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.values, nextProps.values) && !this.state.changed && nextProps.dirty) {
      this.setState({ changed: true });
    }
  }

  componentDidUpdate(prevProps) {
    //Show up general error message
    if (!prevProps.error && this.props.error && !$('#comment-composer-general-error-message').transition('is visible')) {
      $('#comment-composer-general-error-message')
        .transition('fade up');
    }
    //Hide general error message
    if (!_.isEqual(prevProps.values, this.props.values) && this.props.error) {
      $('#comment-composer-general-error-message')
        .transition({
          animation: 'fade up',
          onHide: () => {
            this.props.initializeForm();
          },
          queue: false
        });
    }

    //Show up title Field error message
    if (this.props.fields.content.dirty && this.props.errors.content && !$('.ui.content.label').transition('is visible')) {
      $('.ui.content.pointing.label')
        .transition('fade up');
    }
    //Hide title Field error message
    if (prevProps.errors.content && !this.props.errors.content && $('.ui.content.label').transition('is visible')) {
      $('.ui.content.pointing.label')
        .transition('hide');
    }
  }

  @throttle(1000)
  _submitComment(values, dispatch) {
    this.props.initializeForm();
    const submitCommentForm = Object.assign(values, { postId: this.props.postId });
    return new Promise((resolve, reject) => {
      dispatch(
        submitComment(submitCommentForm)
      ).then((response) => {
        this._resetForm();
        dispatch(showDelayedToastMessage({
          type: 'success',
          title: toastMessages.submitCommentTitle,
          body: toastMessages.submitCommentBody
        }));
        dispatch(insertCommentToCommentsPagination(response.result));
        this.props.loadPost(this.props.postId);
        resolve(response);
      }).catch((error) => {
        const errors = {};
        if (error.errors.content) errors.content = error.errors.content[0];
        if (error.message) errors._error = error.message;
        reject(errors);
      });
    });
  }

  _onSubmit(values, dispatch) {
    return this._submitComment(values, dispatch);
  }

  _resetForm() {
    this.props.resetForm();
    this.setState({ changed: false });
  }

  render() {
    const { auth, style, intl: { formatMessage }, error, errors, fields: { content }, handleSubmit, invalid,
      submitting } = this.props;
    const { changed } = this.state;

    const recommendLogin = (
      <div className="ui green basic button" onClick={this.props.showLoginDialog} type="button">
        {formatMessage(i18n.loginButton)}
      </div>
    );

    const submitCommentButton = (
      <button type="submit" className={classNames('ui blue labeled submit icon small button', { 'loading': submitting })}
              disabled={submitting || invalid} >
        <i className="edit icon" />
        <FormattedMessage {...i18n.button} />
      </button>
    );

    const mobileSubmitCommentButton = (
      <button type="submit" className={classNames('ui blue submit icon small button', { 'loading': submitting })}
              disabled={submitting || invalid} style={styles.mobileSubmitButton}>
        <i className="edit icon" />
      </button>
    );

    return (
      <div className="post-composer ui container" style={[style]} >
        <form className={classNames('comment-composer-form ui reply content', { 'error': (invalid && changed) })} onSubmit={handleSubmit(this._onSubmit)}>
          <div className="ui inverted dimmer">
            <div className="content">
              <div className="center">
                {recommendLogin}
              </div>
            </div>
          </div>
          <div className={classNames('ui fluid action input field')} style={styles.contentField}>
            <input type="text" name="content" placeholder={formatMessage(i18n.contentPlaceHolder)} ref="content" {...content} style={styles.contentTextArea}/>
            <MediaQuery maxWidth={responsivePoint['@tabletLesspoint']}>
              {mobileSubmitCommentButton}
            </MediaQuery>
            <MediaQuery minWidth={responsivePoint['@tabletBreakpoint']}>
              {submitCommentButton}
            </MediaQuery>
          </div>
          <div id="comment-composer-general-error-message"
               className="ui general error message hidden" style={styles.errorText}>
            {error}
          </div>
        </form>
      </div>
    );

  }
}
