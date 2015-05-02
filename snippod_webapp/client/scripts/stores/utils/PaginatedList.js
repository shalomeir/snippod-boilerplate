'use strict';

var _ = require('underscore'),
    Im = require('immutable'),
    invariant = require('react/lib/invariant');

class PaginatedList {
  constructor(idsArray) {
    this._ids = Im.OrderedSet(idsArray) || Im.OrderedSet();
    this._pageCount = 0;
    this._nextPageUrl = '/';
    //this._isExpectingPage = false;
  }

  getIds() {
    return this._ids;
  }

  getPageCount() {
    return this._pageCount;
  }
  //
  //isExpectingPage() {
  //  return this._isExpectingPage;
  //}

  getNextPageUrl() {
    return this._nextPageUrl;
  }

  isLastPage() {
    return this.getNextPageUrl() === null && this.getPageCount() > 0;
  }

  prepend(id) {
    this._ids = this._ids.toList().unshift(id).toOrderedSet();
  }

  push(id) {
    this._ids = this._ids.add(id);
  }

  remove(id) {
    this._ids = this._ids.delete(id);
  }

  //expectPage() {
  //  invariant(!this._isExpectingPage, 'Cannot call expectPage twice without prior cancelPage or receivePage call.');
  //  this._isExpectingPage = true;
  //}
  //
  //cancelPage() {
  //  invariant(this._isExpectingPage, 'Cannot call cancelPage without prior expectPage call.');
  //  this._isExpectingPage = false;
  //}

  receivePage(newIdsArray, nextPageUrl) {
    //invariant(this._isExpectingPage, 'Cannot call receivePage without prior expectPage call.');

    if (newIdsArray.length) {
      this._ids = this._ids.union(newIdsArray);
    }

    //this._isExpectingPage = false;
    this._nextPageUrl = nextPageUrl || null;
    this._pageCount++;
  }
}

module.exports = PaginatedList;