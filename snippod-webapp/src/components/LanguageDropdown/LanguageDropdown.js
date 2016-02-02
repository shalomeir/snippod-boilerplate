import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { switchLocale } from 'ducks/application/application';

const Styles = {
  dropdown: {
    minWidth: '9.2em',
    textAlign: 'center',
    fontSize: '0.78em'
  },
};

@connect(
  null,
  { switchLocale }
)
export default class LanguageDropdown extends Component {
  static propTypes = {
    application: PropTypes.object.isRequired,
    switchLocale: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  componentDidMount() {
    $('.ui.dropdown')
      .dropdown('set selected', this.props.application.locale)
      .dropdown({
        onChange: (value) => {
          this.props.switchLocale(value);
        }
      })
    ;
  }

  render() {
    return (
      <div className= {this.props.className + ' ui floating dropdown labeled icon tiny button'} ref="langSwitcher"
           value={this.props.application.locale} style={ Styles.dropdown }>
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
