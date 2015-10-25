'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    PagenatedList = require('../utils/PaginatedList'),
    CommentStore = require('./CommentStore'),
    PostsActions = require('../../actions/posts/PostsActions');

// This comment list mapped by each post id. So input parameter is postId
var CommentListStore = Reflux.createStore({

  listenables: PostsActions,

  init: function() {
    this._commentLists = Im.Map({});
  },

  getComments: function(postId) {
    var pagenatedList = this._commentLists.get(postId) || new PagenatedList();
    return pagenatedList.getIds().map(CommentStore.get).toArray();
  },

  getPagenatedList: function(postId) {
    var pagenatedList = this._commentLists.get(postId) || new PagenatedList();
    return pagenatedList;
  },

  getObjects: function(postId) {
    return {
      comments: this.getComments(postId),
      pagenatedList: this.getPagenatedList(postId)
    };
  },

  /* Listen PostsActions
   ===============================*/

  setCommentList: function(postId, comments) {
    var commentsArray = comments.results;
    var commentsLength = commentsArray.length;
    var commentsListArray = [];
    for (var i = 0; i < commentsLength; i++) {
      commentsListArray.push(commentsArray[i].id);
    }
    var nextPageUrl = comments.next;
    var pagenatedList = this._commentLists.get(postId);
    if (typeof pagenatedList === 'undefined') {
      pagenatedList = new PagenatedList();
    }
    pagenatedList.receivePage(commentsListArray, nextPageUrl);
    this._commentLists = this._commentLists.set(postId, pagenatedList);
  },

  thenGetCommentsCompleted: function(response) {
    var reqUrlArray = response.req.url.split('/');
    var postId = Number(reqUrlArray[reqUrlArray.length-3]);
    var comments = response.body;
    this.setCommentList(postId, comments);
    this.trigger();
  },

  thenSubmitCommentCompleted: function(response) {
    var postId = response.body.post;
    var updatedPagenatedList = this.getPagenatedList(postId);
    updatedPagenatedList.prepend(response.body.id);
    this._commentLists = this._commentLists.set(postId, updatedPagenatedList);
    this.trigger();
  },

  clearCommentListStore: function(callback) {
    this._commentLists = Im.Map({});
    if(typeof callback !== 'undefined') { callback(); }
  }



});

module.exports = CommentListStore;
