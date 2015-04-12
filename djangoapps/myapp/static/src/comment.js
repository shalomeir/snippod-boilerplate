var React = require('react');

var Comment = React.createClass({

    onClick: function () {
        alert('hello there, ' + this.props.name + '!');
    },

    render: function () {
        return <li onClick={this.onClick}>
            <dl>
            <dt>Id</dt><dd>{this.props.id}</dd>
            <dt>Name</dt><dd>{this.props.name}</dd>
            <dt>Comment</dt><dd>{this.props.text}</dd>
            </dl>
            </li>;

    }

});

module.exports = Comment;
