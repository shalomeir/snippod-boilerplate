import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { throttle } from 'lodash-decorators';
import classNames from 'classnames';

@Radium
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
          this.setState({ isVoting: false });
        }).catch((error) => {
          this.setState({ isVoting: false });
          reject(error);
        });
    });
  }

  @throttle(1000)
  _cancelUpvotePost() {
    this.setState({ isVoting: true });
    return new Promise((resolve, reject) => {
      this.props.onCancelUpvoteClick(this.props.node.id)
        .then((response) => {
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
    const { node, style } = this.props;
    const { isVoting } = this.state;
    const iconName = isVoting ? 'spinner loading blue active' : 'arrow up';
    return (
      <span className="upvote upvote-info" onClick={this._onClick} disabled={isVoting} style={style}>
        <i className={classNames('icon', iconName, { 'active': node.isUpvotedMe })} />
        {node.upvoteCount}
      </span>
    );
  }
}
