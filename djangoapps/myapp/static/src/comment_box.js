var React = require('react');

var CommentBox = React.createClass({


    getInitialState: function () {
        return {'text': '', name: ''};
    },

    onSubmit: function (e) {
        e.preventDefault();

        if (!(this.state.name && this.state.text)) {
            alert('Enter a valid name and comment');
            return false;
        }


        window.react_ctx_comments.comments.push({id: 'TempId_' + Math.floor(Math.random()*100000),
                                                 name: this.state.name, text: this.state.text});
        window.rerenderComments();

        window.Store.submitComment(this.state.name, this.state.text);

        this.setState({text: '', name: ''});
        $(this.refs.name.getDOMNode()).focus();
        window.setTimeout(function () {
            console.log("scrolling");
            $(window).scrollTop(10000);
        }, 0);

    },

    onChangeText: function (e) {
        this.setState({text: e.target.value});
    },

    onChangeName: function (e) {
        this.setState({name: e.target.value});
    },

    render: function () {
        return <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
<fieldset>
            <label>Name<input type="text" ref="name" value={this.state.name} placeholder="Enter name" onChange={this.onChangeName}/></label>
            <label>Comment<input value={this.state.text} placeholder="Enter comment" onChange={this.onChangeText}/></label>

            <button className="pure-button pure-button-primary" type="submit">Submit</button></fieldset>

            </form>;

    }

});

module.exports = CommentBox;
