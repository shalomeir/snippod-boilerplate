import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { defineMessages, FormattedMessage } from 'react-intl';

import $ from 'jquery';
import { shortenString } from 'utils/handleString';
import classNames from 'classnames';

import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);

const radiumStyles = require('theme/RadiumStyles');
const styles = require('./UserCardStyles');

const i18n = defineMessages({
  language: {
    id: 'userCard.language',
    defaultMessage: 'Language'
  },
  korean: {
    id: 'userCard.korean',
    defaultMessage: 'Korean'
  },
});

@Radium
export default class UserCard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    disabledSelfLink: PropTypes.bool,

    account: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  };

  render() {
    const { auth, account, style, disabledSelfLink } = this.props;

    return (
      <div className="user-card ui secondary inverted grey padded text segment center aligned"
           style={[radiumStyles.cardBoxShadow, radiumStyles.paddingBySize, style]}>
        <h2 className="header" style={styles.header}><span style={styles.at}>@</span>{account.username}</h2>
        <i className="big icons" style={[account.description.length ? radiumStyles.floatLeft : null, styles.userIcon]}>
          <i className="big thin circle icon"/>
          <i className="user icon"/>
        </i>
        <div className="description" style={styles.description}>
          {shortenString(account.description, 320)}
        </div>
        <div className="extra-infos extra content" style={styles.extraInfos}>
          <FormattedMessage {...i18n.language} /> : {account.language === 'ko' ? <FormattedMessage {...i18n.korean} /> : 'English'}
        </div>
      </div>
    );
  }
}
