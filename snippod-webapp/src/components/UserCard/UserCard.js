import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import $ from 'jquery';
import { shortenString } from 'utils/handleString';
import classNames from 'classnames';

import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);
import UserCardComposer from './UserCardComposer';

const radiumStyles = require('theme/RadiumStyles');
const styles = require('./UserCardStyles');

import i18nUserCard from 'i18nDefault/components/userCard';
const i18n = i18nUserCard;

@injectIntl
@Radium
export default class UserCard extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    auth: PropTypes.object.isRequired,
    disabledSelfLink: PropTypes.bool,
    offEdited: PropTypes.func,

    account: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  };

  constructor() {
    super();
    this.state = { editing: false };
    this.onEditMode = this.onEditMode.bind(this);
    this.offEditMode = this.offEditMode.bind(this);
  }

  onEditMode() {
    this.setState({ editing: true });
  }

  offEditMode(changed = false) {
    this.setState({ editing: false });
    if (changed) this.props.offEdited();
  }

  render() {
    const { auth, account, style, intl: { formatMessage } } = this.props;
    const { editing } = this.state;

    if (editing) {
      return (<UserCardComposer key={account.id}
                                account={account}
                                auth={auth}
                                offEditingMode={this.offEditMode}/>);
    }

    let userIsMe = false;
    if (auth.loggedIn) {
      if (account && account.id === auth.account.id) {
        userIsMe = true;
      }
    }

    const editButton = (<button className="ui basic inverted button"
                                style={styles.editButton} onClick={this.onEditMode}><i className="edit icon"/>{formatMessage(i18n.editButton)}</button>);


    const usernameDom = (
      <h2 className="header" style={styles.header}><span style={styles.at}>@</span>{account.username}</h2>
    );
    const descriptionDom = (
      <div className="description" style={styles.description}>
        {shortenString(account.description, 320)}
      </div>
    );

    return (
      <div className="user-card ui secondary inverted grey padded text segment center aligned"
           style={[radiumStyles.cardBoxShadow, radiumStyles.paddingBySize, style]}>
        {userIsMe ? editButton : null}
        {usernameDom}
        <i className="big icons" style={[account.description.length ? radiumStyles.floatLeft : null, styles.userIcon]}>
          <i className="big thin circle icon"/>
          <i className="user icon"/>
        </i>
        {account.description.length ? descriptionDom : null}
        <div className="extra-infos extra content" style={styles.extraInfos}>
          <FormattedMessage {...i18n.language} /> : {account.language === 'ko' ? <FormattedMessage {...i18n.korean} /> : 'English'}
        </div>
      </div>
    );
  }
}
