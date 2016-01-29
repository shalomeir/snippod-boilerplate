import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router';
import $ from 'jquery';
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

  componentDidMount() {
    $('.ui.search')
      .search({
        apiSettings: {
          url: '//api.github.com/search/repositories?q={query}'
        },
        fields: {
          results: 'items',
          title: 'name',
          url: 'html_url',
          description: 'stargazers_count'
        }
      })
    ;
  }

  componentDidUpdate() {
    $('.ui.search').search('refresh');
    $('.ui.selection.dropdown').dropdown('refresh');
  }

  handleLocaleSwitch(event) {
    this.props.switchLocale(event.target.value);
  }

  render() {
    return (
      <footer className="layout">
        <div className="footer">
          <p><small>Github repositoriy is located in <a href="https://github.com/shalomeir/snippod-boilerplate" target="_blank">Here.</a></small></p>
          <select className="ui dropdown" ref="langSwitcher" value={this.props.application.locale}
            onChange={this.handleLocaleSwitch}>
            <option value="en">EN</option>
            <option value="ko">KO</option>
          </select>
          <div className="ui selection dropdown">
            <input type="hidden" name="gender" />
              <i className="dropdown icon"></i>
              <div className="default text">Gender</div>
              <div className="menu">
                <div className="item" data-value="1">Male</div>
                <div className="item" data-value="0">Female</div>
              </div>
          </div>
          <i className="ae flag"></i>
          <div className="ui card">
            <div className="image">
              <img src="/images/kristy.png"/>
            </div>
            <div className="content">
              <a className="header">Kristy</a>
              <div className="meta">
                <span className="date">Joined in 2013</span>
              </div>
              <div className="description">
                Kristy is an art director living in New York.
              </div>
            </div>
            <div className="extra content">
              <a>
                <i className="user icon"></i>
                22 Friends
              </a>
            </div>
          </div>
          <div className="ui search">
            <div className="ui left icon input">
              <input className="prompt" type="text" placeholder="Search GitHub"/>
                <i className="github icon"></i>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
