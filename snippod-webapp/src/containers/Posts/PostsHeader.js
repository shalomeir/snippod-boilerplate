import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { defineMessages, FormattedMessage } from 'react-intl';

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
  rightFloatedDropdown: {
    margin: 0,
    padding: 0,
    fontWeight: 'bold',
    fontSize: '0.8em'
  }
};

@Radium
export default class PostsHeader extends Component {

  static propTypes = {
    sortingOption: PropTypes.string.isRequired,
    changeSortingOption: PropTypes.func.isRequired
  };

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
