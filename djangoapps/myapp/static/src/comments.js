var React = require('react');
var Comment = require('./comment');

var Comments = React.createClass({

    render: function () {
        return <ol>
            {this.props.comments.map(function (comment) {
                return <Comment key={comment.id} id={comment.id} name={comment.name} text={comment.text}/>;
            })}
        </ol>;
    }

});

module.exports = Comments;
