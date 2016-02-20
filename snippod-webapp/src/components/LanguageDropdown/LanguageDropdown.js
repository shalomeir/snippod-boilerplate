import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import $ from 'jquery';
import { switchLangAndDeleteLanguageQuery } from 'ducks/application/application';

const Styles = {
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
    className: PropTypes.string.isRequired
  };

  static defaultProps = { className: '' };

  componentDidMount() {
    $('.ui.dropdown')
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
    if (this.props.lang !== $('.ui.dropdown').dropdown('get value')[0]) {
      $('.ui.dropdown').dropdown('set selected', this.props.lang);
    }
  }

  render() {
    const { lang, className } = this.props;
    return (
      <div className= {className + ' ui floating dropdown labeled icon tiny button'} ref="langSwitcher"
           value={lang} style={ Styles.dropdown }>
        <div className="text" style={ Styles.item }/>
        <i className="world icon" />
        <div className="menu">
          <div className="item" data-value="en">English</div>
          <div className="item" data-value="ko">한국어</div>
        </div>
      </div>
    );
  }
}
