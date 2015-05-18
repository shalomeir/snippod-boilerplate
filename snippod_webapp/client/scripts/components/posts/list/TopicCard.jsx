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
            <h1>Welcome to Snippod's boilerplate!</h1>
            <p>
              Take a look at the <a href="https://github.com/shalomeir/snippod-boilerplate">
              github repository</a> and start mixing up something awesome.
            </p>
          </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = TopicCard;
