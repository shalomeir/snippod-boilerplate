import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { defineMessages, FormattedMessage } from 'react-intl';

import { showLoginDialog, showRegisterDialog, redirectReplacePath } from 'ducks/application/application';
import { PostsSortingDropdown } from 'components';

const i18n = defineMessages({
  sort: {
    id: 'postsHeader.sort',
    defaultMessage: 'Sort by'
  },

  posts: {
    id: 'postsHeader.posts',
    defaultMessage: 'Posts'
  }
});

const styles = {
  icon: {
    marginTop: '2.2em',
    marginBottom: '2.2em'
  },

  rightFloatedDropdown: {
    margin: 0,
    padding: 0,
    fontWeight: 'bold',
    fontSize: '0.8em'
  }
};

@connect(
  createSelector([
    state => state.auth
  ], (auth) => {
    return { auth };
  }),
  { showLoginDialog, showRegisterDialog, redirectReplacePath }
)
@Radium
export default class PostsHeader extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    sortingOption: PropTypes.string.isRequired,
    showLoginDialog: PropTypes.func.isRequired,
    showRegisterDialog: PropTypes.func.isRequired,
    redirectReplacePath: PropTypes.func.isRequired,
    changeSortingOption: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.checkAuth = this.checkAuth.bind(this);
  }

  state = {
    slider2: 5,
    slider3: 1
  };

  handleChange(slider, value) {
    const newState = {};
    newState[slider] = value;
    this.setState(newState);
  }

  checkAuth() {
    console.log('hello will login check auth');
    if (this.props.auth.loggedIn) {
      // You already logged in, so do not needed to be here!
      this.props.redirectReplacePath('/');
      return true;
    }
    return false;
  }

  render() {
    const { sortingOption, changeSortingOption } = this.props;

    return (
      <div className="posts-header main-top-margin">
        <span className="ui header"><FormattedMessage {...i18n.posts} /></span>
        <div className="ui right floated basic segment" style={styles.rightFloatedDropdown}>
          <FormattedMessage {...i18n.sort} />&nbsp;&nbsp;&nbsp;
          <PostsSortingDropdown sortingOption={sortingOption}
                                changeSortingOption={changeSortingOption} className="tiny blue"/>
        </div>
        <div className="ui divider"/>
      </div>
    );
  }
}
