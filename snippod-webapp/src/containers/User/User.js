import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import { Link } from 'react-router';
import { UserCard } from 'components';

import { fetchAccount } from 'ducks/accounts/accounts';

const radiumStyles = require('theme/RadiumStyles');
const styles = require('./UserStyles');

const i18n = defineMessages({
  nothingHere: {
    id: 'singlePost.nothingHere',
    defaultMessage: 'Nothing here'
  },

  loading: {
    id: 'singlePost.loading',
    defaultMessage: 'Loading..'
  },

  nothing: {
    id: 'comp.list.nothing',
    defaultMessage: 'Nothing here!'
  }

});

const mapStateToProps = createSelector([
  state => state.auth,
  state => state.entities.accounts,
  (state, props) => props.params
], (auth, accounts, params) => {
  const account = params && accounts[params.userId] ? accounts[params.userId] : null;
  return { auth, account };
});

@connect(
  mapStateToProps,
  { fetchAccount }
)
@injectIntl
@Radium
export default class User extends Component {
  static propTypes = {
    intl: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    account: PropTypes.object,
    params: PropTypes.object.isRequired,
    fetchAccount: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      isFetching: false
    };
    this.loadAccount = this.loadAccount.bind(this);
    this.renderUserCard = this.renderUserCard.bind(this);
  }

  componentWillMount() {
    this.loadAccount(this.props.params.userId);
  }

  loadAccount(accountId) {
    const loadAccountPromise = this.props.fetchAccount(accountId);
    if (loadAccountPromise) {
      this.setState({ isFetching: true });
      loadAccountPromise
        .then((response) => {
          this.setState({ isFetching: false });
        })
        .catch((error) => {
          this.setState({ isFetching: false });
        })
      ;
    }
  }

  renderUserCard(account) {
    const { auth, intl } = this.props;

    return (
      <UserCard key={account.id}
                account={account}
                auth={auth}
                disabledSelfLink />
    );
  }

  render() {
    const { auth, account, intl: { formatMessage } } = this.props;
    const { isFetching } = this.state;

    let userIsMe = false;
    if (auth.loggedIn) {
      if (account && account.id === auth.account.id) {
        userIsMe = true;
      }
    }

    const userTitle = account && !account.deleted ? userIsMe ? 'Me' : account.username :
      isFetching ? formatMessage(i18n.loading) : formatMessage(i18n.nothingHere);

    let tempDom;
    const isEmpty = !account || account.deleted;
    if (isFetching && isEmpty) {
      tempDom = (<div className="ui active centered inline loader" style={styles.loader}></div>);
    }
    if (!isFetching && isEmpty) {
      tempDom = (<h3 style={radiumStyles.center}><i className="frown icon" />{formatMessage(i18n.nothing)}</h3>);
    }

    const accountDom = account ? (
      <div id="capture-and-fire">
        {this.renderUserCard(account)}
        <div className="post-list ui card" style={styles.postsCardContainer}>
          {/*<PostsByAccount account={account} />*/}
        </div>
        <div className="comment-list ui card" style={styles.commentsCardContainer}>
          {/*<CommentsByAccount account={account} />*/}
        </div>
      </div>
    ) : null;

    return (
      <div className="user-home ui text container main-container">
        <Helmet title={userTitle}/>
        {isEmpty ? tempDom : accountDom}
      </div>
    );
  }
}
