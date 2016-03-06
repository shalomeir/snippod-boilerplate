import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import $ from 'jquery';
import moment from 'moment';
import { shortenString } from 'utils/handleString';
import classNames from 'classnames';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import { Link as LinkComponent } from 'react-router';
const Link = Radium(LinkComponent);

import { showLoginDialog, showRegisterDialog } from 'ducks/application/application';
import { logoutAndFollow } from 'ducks/authentication/auth';

const styles = require('./PostStyles');

const i18n = defineMessages({
  comments: {
    id: 'comp.post.comments',
    defaultMessage: '{commentCount, plural, =0 {no comment} =1 {one comment} other {# comments}}'
  }
});


@connect(
  null,
  { showLoginDialog, showRegisterDialog, logoutAndFollow }
)
@injectIntl
@Radium
export default class Post extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    post: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  };


  render() {
    const { post, intl: { formatMessage, locale } } = this.props;

    return (
        <div className="ui centered card" style={styles.card}>
          <div className="content">
            <div className="header" style={styles.title}>
              {post.title}
            </div>
          </div>
          <div className="content" style={styles.mainContent}>
            <div className="link-button ui center aligned container" style={styles.linkButtonContainer}>
              <a className="ui labeled icon blue basic button"
                 href={post.link} target="_blank" style={styles.linkButton}>
                <i className="linkify icon" />
                {shortenString(post.link, 29)}
                {post.link.length > 29 ? (<span className="after-gradient-effect" />) : null}
              </a>
            </div>
            <div className="user">
              <i className="user icon" />{post.author.username}
            </div>
            <div className="meta" style={styles.meta}>
              {moment(post.createdAt).locale(locale).fromNow()}
            </div>
          </div>
          <div className="extra-infos extra content" style={styles.extraInfos}>
            <span className="upvote upvote-info">
              <i className="arrow up icon"></i>
              {post.upvoteCount}
            </span>
            &nbsp;&nbsp;
            <span className="right floated comment-info">
              <i className="comment icon"></i>
              {formatMessage(i18n.comments, { commentCount: post.commentCount })}
            </span>
          </div>
        </div>
    );
  }
}
