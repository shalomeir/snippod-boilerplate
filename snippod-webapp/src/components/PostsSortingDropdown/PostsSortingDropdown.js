import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import classNames from 'classnames';
import $ from 'jquery';
import { injectIntl, intlShape, defineMessages, FormattedMessage } from 'react-intl';

import { pushQuery } from 'ducks/application/application';

const styles = {
  dropdown: {
    width: '12em',
    textAlign: 'center',
    marginRight: 0,
  },
};

const i18n = defineMessages({
  newest: {
    id: 'comp.postsSortingDropdown.newest',
    defaultMessage: 'Newest'
  },
  upvotes: {
    id: 'comp.postsSortingDropdown.upvotes',
    defaultMessage: 'Upvotes'
  },
  comments: {
    id: 'comp.postsSortingDropdown.comments',
    defaultMessage: 'Comments'
  },

});

@connect(
  null,
  { pushQuery }
)
@injectIntl
@Radium
export default class PostsSortingDropdown extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    className: PropTypes.string,
    sortingOption: PropTypes.string.isRequired,
    changeSortingOption: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { sortingOption } = this.props;
    $('.ui.sorting-option.dropdown')
      .dropdown('set selected', sortingOption)
      .dropdown({
        onChange: (value) => {
          this.props.changeSortingOption(value);
        }
      })
    ;
  }

  componentWillUpdate(nextProps) {
    if (this.props.sortingOption !== nextProps.sortingOption) {
      $('.ui.sorting-option.dropdown')
        .dropdown('set selected', nextProps.sortingOption);
    }
  }

  render() {
    const { sortingOption, className, intl: { formatMessage } } = this.props;
    return (
      <div className= {classNames('ui sorting-option floating dropdown labeled icon button', className)} ref="sorting"
           style={ styles.dropdown }>
        <div className="text"/>
        <i className="sort content descending icon" />
        <div className="menu">
          <div className="item" value="newest" data-value="newest">
            {formatMessage(i18n.newest)}
          </div>
          <div className="item" value="upvotes" data-value="upvotes">
            {formatMessage(i18n.upvotes)}
          </div>
          <div className="item" value="comments" data-value="comments">
            {formatMessage(i18n.comments)}
          </div>
        </div>
      </div>
    );
  }
}
