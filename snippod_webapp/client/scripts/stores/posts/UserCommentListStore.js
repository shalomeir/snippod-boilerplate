'use strict';

var Reflux = require('reflux'),
    Im = require('immutable'),
    PagenatedList = require('../utils/PaginatedList'),
    CommentStore = require('./CommentStore'),
    PostsActions = require('../../actions/posts/PostsActions');

// This comment list mapped by each user id. So input parameter is userId
var UserCommentListStore = Reflux.createStore({

  listenables: PostsActions,

  init: function() {
    this._commentLists = Im.Map({});
  },

  getComments: function(userId) {
    var pagenatedList = this._commentLists.get(userId) || new PagenatedList();
    return pagenatedList.getIds().map(CommentStore.get).toArray();
  },

  getPagenatedList: function(userId) {
    var pagenatedList = this._commentLists.get(userId) || new PagenatedList();
    return pagenatedList;
  },

  getObjects: function(userId) {
    return {
      comments: this.getComments(userId),
      pagenatedList: this.getPagenatedList(userId)
    };
  },

  /* Listen PostsActions
   ===============================*/

  setCommentList: function(userId, comments) {
    var commentsArray = comments.results;
    var commentsLength = commentsArray.length;
    var commentsListArray = [];
    for (var i = 0; i < commentsLength; i++) {
      commentsListArray.push(commentsArray[i].id);
    }
    var nextPageUrl = comments.next;
    var pagenatedList = this._commentLists.get(userId);
    if (typeof pagenatedList === 'undefined') {
      pagenatedList = new PagenatedList();
    }
    pagenatedList.receivePage(commentsListArray, nextPageUrl);
    this._commentLists = this._commentLists.set(userId, pagenatedList);
  },

  thenGetUserCommentsCompleted: function(response) {
    var reqUrlArray = response.req.url.split('/');
    var userId = Number(reqUrlArray[reqUrlArray.length-3]);
    var comments = response.body;
    this.setCommentList(userId, comments);
    this.trigger();
  },

  thenSubmitCommentCompleted: function(response) {
    var userId = response.body.author.id;
    this._commentLists = this._commentLists.remove(userId);
    this.trigger();
  },

  clearUserCommentListStore: function(callback) {
    this._commentLists = Im.Map({});
    if(typeof callback !== 'undefined') { callback(); }
  }

});

module.exports = UserCommentListStore;
