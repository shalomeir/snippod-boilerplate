import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import classNames from 'classnames';
import $ from 'jquery';
import { switchLangAndDeleteLanguageQuery } from 'ducks/application/application';

const styles = {
  dropdown: {
    minWidth: '9.2em',
    textAlign: 'center',
    fontSize: '0.78em'
  },
};

@connect(
  null,
  { switchLangAndDeleteLanguageQuery }
)
export default class LanguageDropdown extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    switchLangAndDeleteLanguageQuery: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  componentDidMount() {
    $('.ui.language.dropdown')
      .dropdown('set selected', this.props.lang)
      .dropdown({
        onChange: (value) => {
          if (this.props.lang !== value) {
            this.props.switchLangAndDeleteLanguageQuery(value);
          }
        }
      })
    ;
  }

  componentDidUpdate() {
    if (this.props.lang !== $('.ui.language.dropdown').dropdown('get value')) {
      $('.ui.language.dropdown').dropdown('set selected', this.props.lang);
    }
  }

  render() {
    const { lang, className } = this.props;
    return (
      <div className= {classNames('ui language floating dropdown labeled icon button', className)} ref="langSwitcher"
           style={ styles.dropdown }>
        <div className="text"/>
        <i className="world icon" />
        <div className="menu">
          <div className="item" data-value="en">English</div>
          <div className="item" data-value="ko">한국어</div>
        </div>
      </div>
    );
  }
}
