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

  getObjects: function(sorting) {
    return {
      posts: this.getPosts(sorting),
      pagenatedList: this.getPagenatedList(sorting),
      currentSortOption: this.getCurrentSorting()
    };
  },

  /* Listen PostsActions
   ===============================*/
  setSortBy: function(value) {
    this._sorting.currentSorting = value;
  },

  setPostList: function(sorting, posts) {
    var postsArray = posts.results;
    var postsLength = postsArray.length;
    var postsListArray = [];
    for (var i = 0; i < postsLength; i++) {
      postsListArray.push(postsArray[i].id);
    }
    var nextPageUrl = posts.next;
    var pagenatedList = this._postLists.get(sorting);
    if (typeof pagenatedList === 'undefined') {
      pagenatedList = new PagenatedList();
    }
    pagenatedList.receivePage(postsListArray, nextPageUrl);
    this._postLists = this._postLists.set(sorting, pagenatedList);
  },

  thenGetPostsCompleted: function(response) {
    var sorting = response.req._query.sorting || this._sorting.defaultSorting;
    this.setSortBy(sorting);
    var posts = response.body;
    this.setPostList(sorting, posts);
    this.trigger(this.getObjects(sorting));
  }

});

module.exports = PostListStore;
