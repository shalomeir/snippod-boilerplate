import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';

import IntroCard from './IntroCard/IntroCard';
import { PostComposer, PostsHeader, Posts } from 'containers';

import { POSTS_BY_SORTING_OPTION } from 'ducks/postings';
import { pushQuery } from 'ducks/application/application';

const styles = require('./HomeStyles');

@connect(
  createSelector([
    state => state.auth
  ], (auth) => {
    return { auth };
  }),
  { pushQuery }
)
@Radium
export default class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pushQuery: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this._getSortingOptionFromQuery = this._getSortingOptionFromQuery.bind(this);
    this._setSortingOption = this._setSortingOption.bind(this);
    this.changeSortingOption = this.changeSortingOption.bind(this);
  }

  state = {
    sortingOption: 'newest'
  }

  componentWillMount() {
    this._setSortingOption(this._getSortingOptionFromQuery());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query.sorting !== nextProps.location.query.sorting) {
      if (nextProps.location.query.sorting) {
        this._setSortingOption(nextProps.location.query.sorting);
      } else {
        this._setSortingOption('newest');
      }
    }
  }

  _getSortingOptionFromQuery() {
    if (this.props && this.props.location.query.sorting) {
      return this.props.location.query.sorting;
    }
    return 'newest';
  }

  _setSortingOption(sortingOption = 'newest') {
    if (this.state.sortingOption !== sortingOption) {
      this.setState({ sortingOption });
    }
  }

  changeSortingOption(sortingOption = 'newest') {
    if (this._getSortingOptionFromQuery() !== sortingOption) {
      this.props.pushQuery({ sorting: sortingOption });
    }
  }

  render() {
    const { auth } = this.props;

    return (
      <div className="home ui text container main-container">
        <Helmet title="Home"/>
        <IntroCard />
        <PostComposer auth={auth} style={styles.postComposer}/>
        <PostsHeader sortingOption={this.state.sortingOption}
                     changeSortingOption={this.changeSortingOption} />
        <Posts type={POSTS_BY_SORTING_OPTION} option={this.state.sortingOption} />
      </div>
    );
  }
}
