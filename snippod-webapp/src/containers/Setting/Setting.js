import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Setting extends Component {
  render() {
    return (
      <div className="setting ui text container">
        <Helmet title="Setting" />

        <h1>Setting</h1>
        <p>여기는 셋팅 페이지</p>
      </div>
    );
  }
}
