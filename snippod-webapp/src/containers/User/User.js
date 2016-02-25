import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class User extends Component {
  render() {
    return (
      <div className="user ui text container main-container">
        <Helmet title="User" />

        <h1>User</h1>
        <p>여기는 유저 페이지</p>
      </div>
    );
  }
}
