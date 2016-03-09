import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import Radium from 'radium';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

const radiumStyles = require('theme/RadiumStyles');

const styles = {
  listItems: {
    marginTop: '1em',
    marginBottom: '0.8em'
  },

  loader: {
    marginTop: '3rem'
  },

  nothingText: {
    marginTop: '2em'
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
    style: PropTypes.object,
    className: PropTypes.string,
    nothingText: PropTypes.string
  };

  static defaultProps = {
    isFetching: true
  };

  render() {

    const {
      isFetching, nextPageUrl, pageCount, onLoadMoreClick,
      items, renderItem, style, intl: { formatMessage }, className, nothingText
    } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <div className="ui active centered inline loader" style={styles.loader}></div>;
    }

    const isLastPage = !nextPageUrl && !isFetching;
    if (isEmpty && isLastPage) {
      return <h3 style={[radiumStyles.center, styles.nothingText]}><i className="frown icon" />{nothingText ? nothingText : formatMessage(i18n.nothing)}</h3>;
    }

    const noMoreItems = (
      <div key="no-more-items" className="ui center aligned container">
        <p><i className="child icon" /></p>
      </div>
    );

    const loadMoreButton = (
      <div className="ui center aligned container">
        <button className={classNames('ui basic blue button', { 'loading': isFetching })} style={[{ fontSize: '120%' }, style]}
                onClick={onLoadMoreClick}>{formatMessage(i18n.loadMoreButton)}</button>
      </div>
    );

    //Fixme: transitionEnter and transitionLeave is not working.
    return (
      <div className="list-component" style={[style]}>
        <ReactCSSTransitionGroup
          className={classNames('ui', className)}
          style={styles.listItems}
          component="div"
          transitionName="list"
          transitionAppear
          transitionAppearTimeout={300}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items.map(renderItem)}
        </ReactCSSTransitionGroup>
        {!isEmpty && !isLastPage ? loadMoreButton : null}
        {isLastPage ? noMoreItems : null}
      </div>
    );
  }
}
