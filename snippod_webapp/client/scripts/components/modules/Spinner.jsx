/**
 * Created by shalomeir on 15. 3. 16..
 */
'use strict';
var React = require('react');


var Spinner = React.createClass({

  render: function() {
    var bars = [];
    var barStyle;

    for (var i = 0; i < 12; i++) {
      barStyle = {};
      barStyle.WebkitAnimationDelay = barStyle.animationDelay =
        (i - 12) / 10 + 's';
      barStyle.WebkitTransform = barStyle.transform =
        'rotate(' + (i * 30) + 'deg) translate(146%)';
      bars.push(
        /* jshint ignore:start */
        <div style={ barStyle } className="react-spinner_bar" key={ i } />
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div { ...this.props } className="react-spinner">
                { bars }
      </div>
      /* jshint ignore:end */

    );
  }
});

module.exports = Spinner;
