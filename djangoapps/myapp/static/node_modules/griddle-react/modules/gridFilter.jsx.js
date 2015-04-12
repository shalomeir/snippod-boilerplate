"use strict";

/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/
var React = require("react");

var GridFilter = React.createClass({
    displayName: "GridFilter",
    getDefaultProps: function () {
        return {
            placeholderText: ""
        };
    },
    handleChange: function (event) {
        this.props.changeFilter(event.target.value);
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "filter-container" },
            React.createElement("input", { type: "text", name: "filter", placeholder: this.props.placeholderText, className: "form-control", onChange: this.handleChange })
        );
    }
});

module.exports = GridFilter;