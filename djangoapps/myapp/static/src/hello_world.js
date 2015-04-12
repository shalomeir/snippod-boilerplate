var React = require('react');

var HelloWorld = React.createClass({

    onClick: function () {
        alert('Hello World');
    },

    render: function () {
        return <div className="react-component " onClick={this.onClick}>
            Hello World
        </div>;

    }

});

module.exports = HelloWorld;
