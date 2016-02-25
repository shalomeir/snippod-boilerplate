import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Setting extends Component {

  render() {
    const texts = [];
    for (let i = 0; i < 500; i++) {
      texts.push(<div key={i}>test text</div>);
    }

    return (
      <div className="setting ui text container main-container">
        <Helmet title="Setting" />

        <h1>Setting</h1>
        <p>여기는 셋팅 페이지</p>
        {texts}
      </div>
    );
  }
}
