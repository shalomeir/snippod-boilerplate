"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = require("underscore");

var ColumnProperties = (function () {
  function ColumnProperties() {
    var allColumns = arguments[0] === undefined ? [] : arguments[0];
    var filteredColumns = arguments[1] === undefined ? [] : arguments[1];
    var childrenColumnName = arguments[2] === undefined ? "children" : arguments[2];
    var columnMetadata = arguments[3] === undefined ? [] : arguments[3];
    var metadataColumns = arguments[4] === undefined ? [] : arguments[4];
    _classCallCheck(this, ColumnProperties);

    this.allColumns = allColumns;
    this.filteredColumns = filteredColumns;
    this.childrenColumnName = childrenColumnName;
    this.columnMetadata = columnMetadata;
    this.metadataColumns = metadataColumns;
  }

  _prototypeProperties(ColumnProperties, null, {
    getMetadataColumns: {
      value: function getMetadataColumns() {
        var meta = _.map(_.where(this.columnMetadata, { visible: false }), function (item) {
          return item.columnName;
        });
        if (meta.indexOf(this.childrenColumnName) < 0) {
          meta.push(this.childrenColumnName);
        }
        return meta.concat(this.metadataColumns);
      },
      writable: true,
      configurable: true
    },
    getVisibleColumnCount: {
      value: function getVisibleColumnCount() {
        return this.getColumns().length;
      },
      writable: true,
      configurable: true
    },
    getColumnMetadataByName: {
      value: function getColumnMetadataByName(name) {
        return _.findWhere(this.columnMetadata, { columnName: name });
      },
      writable: true,
      configurable: true
    },
    hasColumnMetadata: {
      value: function hasColumnMetadata() {
        return this.columnMetadata !== null && this.columnMetadata.length > 0;
      },
      writable: true,
      configurable: true
    },
    getMetadataColumnProperty: {
      value: function getMetadataColumnProperty(columnName, propertyName, defaultValue) {
        var meta = this.getColumnMetadataByName(columnName);

        //send back the default value if meta isn't there
        if (typeof meta === "undefined" || meta === null) {
          return defaultValue;
        }return meta.hasOwnProperty(propertyName) ? meta[propertyName] : defaultValue;
      },
      writable: true,
      configurable: true
    },
    orderColumns: {
      value: function orderColumns(cols) {
        var _this = this;
        var ORDER_MAX = 100;

        var orderedColumns = _.sortBy(cols, function (item) {
          var metaItem = _.findWhere(_this.columnMetadata, { columnName: item });

          if (typeof metaItem === "undefined" || metaItem === null || isNaN(metaItem.order)) {
            return ORDER_MAX;
          }

          return metaItem.order;
        });

        return orderedColumns;
      },
      writable: true,
      configurable: true
    },
    getColumns: {
      value: function getColumns() {
        //if we didn't set default or filter
        var filteredColumns = this.filteredColumns.length === 0 ? this.allColumns : this.filteredColumns;

        filteredColumns = _.difference(filteredColumns, this.metadataColumns);

        filteredColumns = this.orderColumns(filteredColumns);

        return filteredColumns;
      },
      writable: true,
      configurable: true
    }
  });

  return ColumnProperties;
})();

module.exports = ColumnProperties;