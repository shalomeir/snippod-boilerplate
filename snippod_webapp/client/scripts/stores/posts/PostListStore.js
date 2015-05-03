'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    PagenatedList = require('../utils/PaginatedList'),
    sortingOptionDefault = require('../../constants/defaults').sortingOption,
    { getParameterByName } = require('../../utils/StringControl'),
    PostStore = require('./PostStore'),
    PostsActions = require('../../actions/posts/PostsActions');

// This post list mapped by each sorting type.

var PostListStore = Reflux.createStore({

  listenables: PostsActions,

  init: function() {
    this._postLists = Im.Map({});
  },

  getPosts: function(sorting) {
    var option = sorting || sortingOptionDefault.defaultSorting;
    var pagenatedList = this._postLists.get(option) || new PagenatedList();
    return pagenatedList.getIds().map(PostStore.get).toArray();
  },

  getPagenatedList: function(sorting) {
    var option = sorting || sortingOptionDefault.defaultSorting;
    var pagenatedList = this._postLists.get(option) || new PagenatedList();
    return pagenatedList;
  },

  getObjects: function(sorting) {
    return {
      posts: this.getPosts(sorting),
      pagenatedList: this.getPagenatedList(sorting)
    };
  },

  /* Listen PostsActions
   ===============================*/
  //setSortBy: function(value) {
  //  this._sorting.currentSorting = value;
  //},

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
    var sorting = getParameterByName(response.req.url,'sorting');
    var posts = response.body;
    this.setPostList(sorting, posts);
    this.trigger();
  },

  clearPostListStore: function(callback) {
    this._postLists = Im.Map({});
    if(typeof callback !== 'undefined') { callback(); }
  }

});

module.exports = PostListStore;
