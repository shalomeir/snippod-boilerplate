'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    PagenatedList = require('../utils/PaginatedList'),
    PostStore = require('./PostStore'),
    PostsActions = require('../../actions/posts/PostsActions');

// This post list mapped by each sorting type.

var UserPostListStore = Reflux.createStore({

  listenables: PostsActions,

  init: function() {
    this._postLists = Im.Map({});
  },

  getPosts: function(userId) {
    var pagenatedList = this._postLists.get(userId) || new PagenatedList();
    return pagenatedList.getIds().map(PostStore.get).toArray();
  },

  getPagenatedList: function(userId) {
    var pagenatedList = this._postLists.get(userId) || new PagenatedList();
    return pagenatedList;
  },

  getObjects: function(userId) {
    return {
      posts: this.getPosts(userId),
      pagenatedList: this.getPagenatedList(userId)
    };
  },

  /* Listen PostsActions
   ===============================*/
  //setSortBy: function(value) {
  //  this._sorting.currentSorting = value;
  //},

  setPostList: function(userId, posts) {
    var postsArray = posts.results;
    var postsLength = postsArray.length;
    var postsListArray = [];
    for (var i = 0; i < postsLength; i++) {
      postsListArray.push(postsArray[i].id);
    }
    var nextPageUrl = posts.next;
    var pagenatedList = this._postLists.get(userId);
    if (typeof pagenatedList === 'undefined') {
      pagenatedList = new PagenatedList();
    }
    pagenatedList.receivePage(postsListArray, nextPageUrl);
    this._postLists = this._postLists.set(userId, pagenatedList);
  },

  thenGetUserPostsCompleted: function(response) {
    var reqUrlArray = response.req.url.split('/');
    var userId = Number(reqUrlArray[reqUrlArray.length-3]);
    var posts = response.body;
    this.setPostList(userId, posts);
    this.trigger();
  },

  //clear All Posts Store
  //
  //thenSubmitPostCompleted: function(response) {
  //  var userId = response.author.id;
  //  this._postLists = this._postLists.remove(userId);
  //  this.trigger();
  //},

  clearUserPostListStore: function(callback) {
    this._postLists = Im.Map({});
    if(typeof callback !== 'undefined') { callback(); }
  }

});

module.exports = UserPostListStore;
