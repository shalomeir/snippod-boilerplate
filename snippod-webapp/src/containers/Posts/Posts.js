import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { defineMessages, FormattedMessage } from 'react-intl';
import { showLoginDialog, showRegisterDialog, redirectReplacePath } from 'ducks/application/application';
import { loadPost, loadPostsBySortingOption, loadPostsByAccount } from 'ducks/posts/posts';

const i18n = defineMessages({
  loginMessageHeader: {
    id: 'ground.login.messageHeader',
    defaultMessage: 'Log-in'
  },
});

const styles = {
  container: {
    marginTop: '1em',
    marginBottom: '1em'
  },

};

@connect(
  null,
  { loadPost, loadPostsByAccount }
)
@Radium
export default class Posts extends Component {

  static propTypes = {
    sortingOption: PropTypes.string.isRequired,
    loadPost: PropTypes.func.isRequired,
    loadPostsByAccount: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit() {
    const accountId = this.refs.text_id.value;
    this.props.loadPostsByAccount(accountId);
  }

  render() {

    return (
      <div className="posts ui container">
        posts ...
        <button className="ui button" onClick={this._onSubmit}>
          loadPost
        </button>
        <div className="ui input">
          <input type="text" placeholder="Search..." ref="text_id" />
        </div>
        <div className="ui button">
          FetchPost
        </div>
      </div>
    );
  }
}
