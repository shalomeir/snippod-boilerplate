'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    { isInBag } = require('../utils/StoreUtils'),
    PagenatedList = require('../utils/PaginatedList'),
    sortingOptionDefault = require('../../constants/defaults').sortingOption,
    PostStore = require('./PostStore'),
    PostsActions = require('../../actions/posts/PostsActions');

var PostListStore = Reflux.createStore({

  listenables: PostsActions,

  init: function() {
    this._postLists = Im.Map({});
    this._sorting = sortingOptionDefault;
  },

  getPosts: function(sorting) {
    var option = sorting || this._sorting.currentSorting;
    var pagenatedList = this._postLists.get(option) || new PagenatedList();
    return pagenatedList.getIds().map(PostStore.get).toArray();
  },

  getPagenatedList: function(sorting) {
    var option = sorting || this._sorting.currentSorting;
    var pagenatedList = this._postLists.get(option) || new PagenatedList();
    return pagenatedList;
  },

  getCurrentSorting: function() {
    return this._sorting.currentSorting;
  },

  getObjects: function() {
    return {
      posts: this.getPosts(),
      pagenatedList: this.getPagenatedList(),
      currentSortOption: this.getCurrentSorting()
    };
  },

  /* Listen PostsActions
   ===============================*/
  setSortBy: function(value) {
    this._sorting.currentSorting = value;
    this.trigger(this.getObjects());
  },

  setPostList: function(sorting, posts) {
    var postListArray = posts.toArray();
    var nextPageUrl = posts.next;
    var pagenatedList = this._postLists.get(sorting);
    if (typeof pagenatedList === 'undefined') {
      pagenatedList = new PagenatedList();
    }

    pagenatedList.receivePage(postListArray, nextPageUrl);

    this._postLists.set(sorting, pagenatedList);
    this.trigger(this.getObjects());
  }

});

module.exports = PostListStore;
