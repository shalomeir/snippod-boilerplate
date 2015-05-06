'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    { isInBag } = require('../utils/StoreUtils'),
    PostsActions = require('../../actions/posts/PostsActions');

var PostStore = Reflux.createStore({

  listenables: PostsActions,

  init: function() {
    this._posts = Im.Map({});
  },

  get: function(id) {
    return this._posts.get(id);
  },

  contains(id, fields) {
    return isInBag(this._posts, id, fields);
  },

  /* Listen PostsActions
   ===============================*/
  setPosts: function(postsArray) {
    var postsLength = postsArray.length;
    for (var i = 0; i < postsLength; i++) {
      this._posts = this._posts.set(postsArray[i].id,postsArray[i]);
    }
  },

  set: function(post) {
    this._posts = this._posts.set(post.id, post);
  },

  onGetPostsCompleted: function(response) {
    this.setPosts(response.body.results);
    PostsActions.thenGetPostsCompleted(response);
  },

  onGetUserPostsCompleted: function(response) {
    this.setPosts(response.body.results);
    PostsActions.thenGetUserPostsCompleted(response);
  },

  onGetPostCompleted: function(response) {
    this.set(response.body);
    this.trigger();
  },

  onSubmitPostCompleted: function(response) {
    this.set(response.body);
    PostsActions.nextSubmitPostCompleted(response);
  },

  onUpvotePostCompleted: function(response) {
    this.set(response.body);
    this.trigger();
  },

  onCancelUpvotePostCompleted: function(response) {
    this.set(response.body);
    this.trigger();
  },

  onDeletePostCompleted: function(response) {
    var urlArray = response.req.url.split('/');
    var postId = Number(urlArray[urlArray.length - 2]);
    var deletedPost = {
      isDeleted: true,
      id: postId
    };
    this.set(deletedPost);
    this.trigger();
  },

  clearPostStore: function(callback) {
    this.init();
    if(typeof callback !== 'undefined') { callback(); }
  }

});

module.exports = PostStore;


