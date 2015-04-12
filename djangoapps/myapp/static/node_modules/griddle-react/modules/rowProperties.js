"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = require("underscore");

var RowProperties = (function () {
  function RowProperties() {
    var rowMetadata = arguments[0] === undefined ? {} : arguments[0];
    _classCallCheck(this, RowProperties);

    this.rowMetadata = rowMetadata;
  }

  _prototypeProperties(RowProperties, null, {
    getRowKey: {
      value: function getRowKey(row) {
        var uniqueId;

        if (this.hasRowMetadataKey()) {
          uniqueId = row[this.rowMetadata.key];
        } else {
          uniqueId = _.uniqueId("grid_row");
        }

        //todo: add error handling

        return uniqueId;
      },
      writable: true,
      configurable: true
    },
    hasRowMetadataKey: {
      value: function hasRowMetadataKey() {
        return this.hasRowMetadata() && this.rowMetadata.key !== null && this.rowMetadata.key !== undefined;
      },
      writable: true,
      configurable: true
    },
    getBodyRowMetadataClass: {
      value: function getBodyRowMetadataClass(rowData) {
        if (this.hasRowMetadata() && this.rowMetadata.bodyCssClassName !== null && this.rowMetadata.bodyCssClassName !== undefined) {
          if (typeof this.rowMetadata.bodyCssClassName === "function") {
            return this.rowMetadata.bodyCssClassName(rowData);
          } else {
            return this.rowMetadata.bodyCssClassName;
          }
        }
        return null;
      },
      writable: true,
      configurable: true
    },
    getHeaderRowMetadataClass: {
      value: function getHeaderRowMetadataClass() {
        return this.hasRowMetadata() && this.rowMetadata.headerCssClassName !== null && this.rowMetadata.headerCssClassName !== undefined ? this.rowMetadata.headerCssClassName : null;
      },
      writable: true,
      configurable: true
    },
    hasRowMetadata: {
      value: function hasRowMetadata() {
        return this.rowMetadata !== null;
      },
      writable: true,
      configurable: true
    }
  });

  return RowProperties;
})();

module.exports = RowProperties;