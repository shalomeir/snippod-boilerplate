'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    { isInBag } = require('../utils/StoreUtils'),
    PostsActions = require('../../actions/posts/PostsActions');

var CommentStore = Reflux.createStore({

  listenables: PostsActions,

  init: function() {
    this._comments = Im.Map({});
  },

  get: function(id) {
    return this._comments.get(id);
  },

  contains(id, fields) {
    return isInBag(this._comments, id, fields);
  },

  /* Listen PostsActions
   ===============================*/
  setComments: function(commentsArray) {
    var commentsLength = commentsArray.length;
    for (var i = 0; i < commentsLength; i++) {
      this._comments = this._comments.set(commentsArray[i].id,commentsArray[i]);
    }
  },

  set: function(comment) {
    this._comments = this._comments.set(comment.id, comment);
  },

  onGetCommentsCompleted: function(response) {
    this.setComments(response.body.results);
    PostsActions.thenGetCommentsCompleted(response);
  },

  onGetUserCommentsCompleted: function(response) {
    this.setComments(response.body.results);
    PostsActions.thenGetUserCommentsCompleted(response);
  },

  onSubmitCommentCompleted: function(response) {
    this.set(response.body);
    PostsActions.thenSubmitCommentCompleted(response);
    PostsActions.getPost(response.body.post);
  },

  onUpvoteCommentCompleted: function(response) {
    this.set(response.body);
    this.trigger();
  },

  onCancelUpvoteCommentCompleted: function(response) {
    this.set(response.body);
    this.trigger();
  },

  onDeleteCommentCompleted: function(response) {
    var urlArray = response.req.url.split('/');
    var commentId = Number(urlArray[urlArray.length - 2]);
    var postIdOfDeletedComment = this.get(commentId).post;
    var deletedComment = {
      isDeleted: true,
      id: commentId
    };
    this.set(deletedComment);
    this.trigger();
    PostsActions.getPost(postIdOfDeletedComment);
  },

  clearCommentStore: function(callback) {
    this.init();
    if(typeof callback !== 'undefined') { callback(); }
  }

});

module.exports = CommentStore;


