import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import $ from 'jquery';
import { defineMessages, FormattedMessage } from 'react-intl';

import { switchLocale } from 'ducks/application/application';

const i18n = defineMessages({
  loginButton: {
    id: 'comp.authButtons.loginButton',
    defaultMessage: 'Login'
  },
  registerButton: {
    id: 'comp.authButtons.registerButton',
    defaultMessage: 'Register'
  }
});

const Styles = {
  button: {
    width: '6.2em',
    textAlign: 'center'
  },
};

@connect(
  createSelector([
    state => state.application
  ], (application) => {
    return { application };
  }),
  { switchLocale }
)
export default class AuthButtons extends Component {
  static propTypes = {
    application: PropTypes.object.isRequired,
    switchLocale: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  componentDidMount() {
    $('.ui.dropdown')
      .dropdown('set selected', this.props.application.locale)
      .dropdown({
        onChange: (value) => {
          this.props.switchLocale(value);
        }
      })
    ;
  }

  render() {
    return (
      <div className= {this.props.className + ' ui buttons'} ref="authButtons"
           style={ Styles.buttons }>
        <button className="ui left attached green basic button" style={ Styles.button }>
          <FormattedMessage {...i18n.loginButton} />
        </button>
        <button className="ui right attached blue basic button" style={ Styles.button }>
          <FormattedMessage {...i18n.registerButton} />
        </button>
      </div>
    );
  }
}
