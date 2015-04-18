/**
 *   Topic Component Description
 */

'use strict';

var React = require('react'),
    PureRenderMixin = require('react/addons').addons.PureRenderMixin;


var TopicCard = React.createClass({

  mixins:[PureRenderMixin],

  render: function() {
    return (
      /* jshint ignore:start */
          <div className="main-info topic-card" id="topic-card">
            <h1>Welcome to Snippod's boilerplate!</h1>
            <p>
              Take a look at the <a href="https://github.com/shalomeir/generator-snippod-hackathon">
              documentation</a> and start mixing up something awesome.
            </p>
            <p>
              <img src="static/images/snippod-swirl.png" width="75px" className="logo" />
            </p>
          </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = TopicCard;
