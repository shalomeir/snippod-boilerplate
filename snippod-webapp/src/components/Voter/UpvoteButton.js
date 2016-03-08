import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { throttle } from 'lodash-decorators';
import classNames from 'classnames';

export default class UpvoteButton extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    onUpvoteClick: PropTypes.func.isRequired,
    onCancelUpvoteClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
  };

  constructor() {
    super();
    this.state = { isVoting: false };
    this._upvotePost = this._upvotePost.bind(this);
    this._cancelUpvotePost = this._cancelUpvotePost.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  @throttle(1000)
  _upvotePost() {
    this.setState({ isVoting: true });
    return new Promise((resolve, reject) => {
      this.props.onUpvoteClick(this.props.node.id)
        .then((response) => {
          console.log('upvote succedd');
          console.log(response);
          this.setState({ isVoting: false });
        }).catch((error) => {
          console.log(error);
          this.setState({ isVoting: false });
        });
    });
  }

  @throttle(1000)
  _cancelUpvotePost() {
    this.setState({ isVoting: true });
    return new Promise((resolve, reject) => {
      this.props.onCancelUpvoteClick(this.props.node.id)
        .then((response) => {
          console.log('Cancel upvote succedd');
          console.log(response);
          this.setState({ isVoting: false });
        }).catch((error) => {
          this.setState({ isVoting: false });
          reject(error);
        });
    });
  }

  _onClick() {
    if (!this.props.node.isUpvotedMe) {
      return this._upvotePost();
    }
    if (this.props.node.isUpvotedMe) {
      return this._cancelUpvotePost();
    }
  }

  render() {
    const { node } = this.props;

    return (
      <span className="upvote upvote-info" onClick={this._onClick}>
        <i className="arrow up icon" />
        {node.upvoteCount}
      </span>
    );
  }
}
