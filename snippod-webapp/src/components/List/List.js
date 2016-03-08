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
  },
  nothing: {
    id: 'comp.list.nothing',
    defaultMessage: 'Nothing here!'
  }
});

@injectIntl
@Radium
export default class List extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    pageCount: PropTypes.number,
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,
    nextPageUrl: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    isFetching: true
  };

  render() {

    const {
      isFetching, nextPageUrl, pageCount, onLoadMoreClick,
      items, renderItem, style, intl: { formatMessage }
    } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <div className="ui active centered inline loader" style={styles.loader}></div>;
    }

    const isLastPage = !nextPageUrl && !isFetching;
    if (isEmpty && isLastPage) {
      return <h3><i className="frown icon">{formatMessage(i18n.nothing)}</i></h3>;
    }

    const noMoreItems = (
      <div key="no-more-items" className="ui center aligned container">
        <p><i className="child icon" /></p>
      </div>
    );

    const loadMoreButton = (
      <div className="ui center aligned container">
        <button className={classNames('ui basic blue button', { 'loading': isFetching })} style={[{ fontSize: '130%' }, style]}
                onClick={onLoadMoreClick}>{formatMessage(i18n.loadMoreButton)}</button>
      </div>
    );

    //Fixme: transitionEnter and transitionLeave is not working.
    return (
      <div className="list" style={[style]}>
        <ReactCSSTransitionGroup
          transitionName="list"
          transitionAppear
          transitionAppearTimeout={300}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          <div className="ui one cards" style={styles.cards} key="cards">
            {items.map(renderItem)}
          </div>
        </ReactCSSTransitionGroup>
        {!isEmpty && !isLastPage ? loadMoreButton : null}
        {isLastPage ? noMoreItems : null}
      </div>
    );
  }
}
