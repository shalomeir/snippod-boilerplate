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

  onSubmitPostCompleted: function(response) {
    this.set(response.body);
    PostsActions.thenSubmitPostCompleted(response);
  },

  onUpvotePostCompleted: function(response) {
    this.set(response.body);
    this.trigger(this._posts.get(response.body.id));
  },

  onCancelUpvotePostCompleted: function(response) {
    this.set(response.body);
    this.trigger(this._posts.get(response.body.id));
  },

  onDeletePostCompleted: function(response) {
    var urlArray = response.req.url.split('/');
    var postId = Number(urlArray[urlArray.length - 2]);
    var deletedPost = {
      isDeleted: true,
      id: postId
    };
    this.set(deletedPost);
    this.trigger(this._posts.get(postId));
  },


  clearAllPostsStore: function() {
    this.init();
  }

});

module.exports = PostStore;


