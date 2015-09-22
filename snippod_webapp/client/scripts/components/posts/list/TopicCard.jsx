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
              This demo is developed using <a href="http://www.django-rest-framework.org/">Django REST Framework</a>
              &nbsp;and <a href="https://facebook.github.io/react/index.html">React</a>
              &nbsp;+ <a href="https://facebook.github.io/flux/docs/overview.html">Flux</a>.<br/>
              Take a look at the <a href="https://github.com/shalomeir/snippod-boilerplate">
              github repository</a>.
            </p>
          </div>
      /* jshint ignore:end */
    );
  }

});

module.exports = TopicCard;
