import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import Radium from 'radium';
import { injectIntl, intlShape, defineMessages } from 'react-intl';


const styles = {
  cards: {
    marginTop: '1em',
    marginBottom: '0.8em'
  },

  loader: {
    marginTop: '3rem'
  }

};

const i18n = defineMessages({
  loadMoreButton: {
    id: 'comp.list.loadMoreButton',
    defaultMessage: 'Load More'
  }
});

@injectIntl
@Radium
export default class List extends Component {

  static propTypes = {
    intl: intlShape.isRequired
  };

  renderLoadMore() {
    const { isFetching, onLoadMoreClick, intl: { formatMessage } } = this.props;

    return (
      <div className="ui aligned certer container">
        <button className={classNames('ui basic loading button', { 'loading': isFetching })} style={{ fontSize: '150%' }}
          onClick={onLoadMoreClick}>{formatMessage(i18n.loadMoreButton)}</button>
      </div>
    );
  }

  render() {

    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, style
    } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <div className="ui active centered inline loader" style={styles.loader}></div>;
    }

    const isLastPage = !nextPageUrl;
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>;
    }

    const noMoreItems = (
      <div key="no-more-items" className="ui center aligned container">
        <p><i className="child icon" /></p>
      </div>
    );

    return (
      <div className="list" style={[style]}>
        <ReactCSSTransitionGroup
          transitionName="list"
          transitionAppear
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          <div className="ui one cards" style={styles.cards}>
            {items.map(renderItem)}
          </div>
          {isLastPage ? noMoreItems : null}
        </ReactCSSTransitionGroup>
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    );
  }
}

List.propTypes = {
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string,
  style: PropTypes.object
};

List.defaultProps = {
  isFetching: true,
};
