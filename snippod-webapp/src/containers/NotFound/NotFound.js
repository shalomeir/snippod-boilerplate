import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div className="not-found container main-container">
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}
