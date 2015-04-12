"use strict";

/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/
var React = require("react");

var GridNoData = React.createClass({
    displayName: "GridNoData",
    getDefaultProps: function () {
        return {
            noDataMessage: "No Data"
        };
    },
    render: function () {
        var that = this;

        return React.createElement(
            "div",
            null,
            this.props.noDataMessage
        );
    }
});

module.exports = GridNoData;