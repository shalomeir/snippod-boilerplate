'use strict';

var Im = require('immutable'),
    assign = require('object-assign'),
    shallowEqual = require('react/lib/shallowEqual');

var StoreUtils = {

  isInBag(bag, id, fields) {
    var item = bag.get(id).toJS();
    if (typeof item === 'undefined') {
      return false;
    }

    if (fields) {
      return fields.every(field => item.hasOwnProperty(field));
    } else {
      return true;
    }
  }
};

module.exports = StoreUtils;