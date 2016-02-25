import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link as RouterLink } from 'react-router';
const Link = Radium(RouterLink);
import { defineMessages, FormattedMessage } from 'react-intl';

const i18n = defineMessages({
  settingButton: {
    id: 'layout.navBar.settingButton',
    defaultMessage: 'Setting'
  }
});

@Radium
export default class SideBar extends Component {
  static propTypes = {
    childType: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    className: PropTypes.string,
    auth: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
  };

  render() {
    const { childType, params, className, auth, lang } = this.props;

    return (
      <div className={classNames(className, 'ui vertical inverted sidebar menu')}>
        <a className="active item">Home</a>
        <a className="item">Work</a>
        <a className="item">Company</a>
        <a className="item">Careers</a>
        <a className="item">Login</a>
        <a className="item">Signup</a>
      </div>
    );
  }
}
