import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';

import { switchLocale } from 'ducks/application/application';

@connect(
  createSelector([
    state => state.application
  ], (application) => {
    return { application };
  }),
  { switchLocale }
)
@Radium
export default class Footer extends Component {
  static propTypes = {
    application: PropTypes.object.isRequired,
    switchLocale: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.handleLocaleSwitch = this.handleLocaleSwitch.bind(this);
  }

  handleLocaleSwitch(event) {
    this.props.switchLocale(event.target.value);
  }

  render() {
    return (
      <footer className="layout">
        <div className="footer">
          <p><small>Github repositoriy is located in <a href="https://github.com/shalomeir/snippod-boilerplate" target="_blank">Here.</a></small></p>
          <form className="language-switcher">
            <fieldset>
              <select ref="langSwitcher" value={this.props.application.locale}
                onChange={this.handleLocaleSwitch}>
                <option value="en">EN</option>
                <option value="ko">KO</option>
              </select>
            </fieldset>
          </form>
        </div>
      </footer>
    );
  }
}
