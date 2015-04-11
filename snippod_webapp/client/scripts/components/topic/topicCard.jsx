/**
 *   Topic Component Description
 */

'use strict';

var React = require('react');

var TopicCard = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
          <div className="main-info topic-card" id="topic-card">
            <h1>Welcome to Snippod's boilerplate2!</h1>
            <p>
              Take a look at the <a href="https://github.com/shalomeir/generator-snippod-hackathon">
              documentation</a> and start mixing up something awesome.
            </p>
            <p>
              <img src="/images/yeogurt-swirl.png" width="75px" className="logo" />
            </p>
          </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = TopicCard;
