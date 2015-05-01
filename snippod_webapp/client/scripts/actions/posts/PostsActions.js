/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var Reflux = require('reflux'),
    $ = require('jquery'),
    router = require('../../router'),
    { requestGet, requestPost, requestPostForm }= require('../../utils/RESTCall');

var PostsActions = Reflux.createActions({

  // API GET actions
  'getPosts': { asyncResult: true },
  'getPost': { asyncResult: true },
  'getComments': { asyncResult: true },

  // post actions
  'submitPost':{ asyncResult: true },
  'upvotePost':{ asyncResult: true },
  'cancelUpvotePost':{ asyncResult: true },
  //'downvotePost':{},
  'deletePost':{ asyncResult: true },

  // comment actions
  'upvoteComment': {},
  //'downvoteComment': {},
  'addComment': {},
  'deleteComment': {},

  'setSortBy':{},

  // for guarrentee sequencial processing store update
  'thenGetPostsCompleted': {},
  'thenSubmitPostCompleted': {},
  'clearAllPostsStore': {},
  'clearAllCommentsStore': {}

});


/* API Get Actions
 ===============================*/
PostsActions.getPosts.preEmit = function(requestUrl, query, callback) {
  requestGet(requestUrl,query,callback)
    .then(this.completed)
    .catch(this.failed);
};

// TODO : Check {} undefined value pass this request
PostsActions.getPost.preEmit = function(requestUrl, callback) {
  requestGet(requestUrl,{},callback)
    .then(this.completed)
    .catch(this.failed);
};

PostsActions.getComments.preEmit = function(requestUrl, callback) {
  requestGet(requestUrl,{},callback)
    .then(this.completed)
    .catch(this.failed);
};


/* Post Actions
 ===============================*/
PostsActions.submitPost.preEmit = function(form, callback) {
  requestPostForm(form, callback)
    .then(this.completed)
    .catch(this.failed);
};

// Upvote, Cancel_Upvote post
PostsActions.upvotePost.preEmit= function(postId) {
  var requestUrl = '/posts/'+postId+'/upvote/';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};

PostsActions.cancelUpvotePost.preEmit= function(postId) {
  var requestUrl = '/posts/'+postId+'/cancel_upvote/';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};

// Delete post
PostsActions.deletePost.preEmit= function(postId) {
  var requestUrl = '/posts/'+postId+'/'+'?_method=DELETE';
  requestPost(requestUrl)
    .then(this.completed)
    .catch(this.failed);
};


//
//PostsActions.submitPost.listen(function(form,callback) {
//  var cb = callback || function() {};
//  cb.options = {
//    refresh: true
//  };
//  _postForm(form, cb);
//
//});
//
//PostsActions.deletePost.listen(function(postId) {
//  //postsRef.child(postId).remove();
//});
//
//PostsActions.upvotePost.listen(function(userId, postId) {
//  //postsRef.child(postId).child('upvotes').transaction(function(curr) {
//  //  return (curr || 0) + 1;
//  //}, function(error, success) {
//  //  if (success) {
//  //    // register upvote in user's profile
//  //    usersRef.child(userId).child('upvoted').child(postId).set(true);
//  //  }
//  //});
//});
//
//PostsActions.downvotePost.listen(function(userId, postId) {
//  //postsRef.child(postId).child('upvotes').transaction(function(curr) {
//  //  return curr - 1;
//  //}, function(error, success) {
//  //  if (success) {
//  //    // register upvote in user's profile
//  //    usersRef.child(userId).child('upvoted').child(postId).remove();
//  //  }
//  //});
//});
//
//
///* Comment Actions
// ===============================*/
//
//PostsActions.updateCommentCount.preEmit = function(postId, n) {
//  // updates comment count on post
//  //postsRef.child(postId).child('commentCount').transaction(function(curr) {
//  //  return curr + n;
//  //});
//};
//
//PostsActions.upvoteComment.preEmit = function(userId, commentId) {
//  //commentsRef.child(commentId).child('upvotes').transaction(function(curr) {
//  //  return (curr || 0) + 1;
//  //}, function(error, success) {
//  //  if (success) {
//  //    // register upvote in user's profile
//  //    usersRef.child(userId).child('upvoted').child(commentId).set(true);
//  //  }
//  //});
//};
//
//PostsActions.downvoteComment.preEmit = function(userId, commentId) {
//  //commentsRef.child(commentId).child('upvotes').transaction(function(curr) {
//  //  return curr - 1;
//  //}, function(error, success) {
//  //  if (success) {
//  //    // register upvote in user's profile
//  //    usersRef.child(userId).child('upvoted').child(commentId).remove();
//  //  }
//  //});
//};
//
//PostsActions.addComment.preEmit = function(comment) {
//  //commentsRef.push(comment, function(error) {
//  //  if (error === null) {
//  //    actions.updateCommentCount(comment.postId, 1);
//  //  }
//  //});
//};
//
//PostsActions.deleteComment.preEmit = function(commentId, postId) {
//  //commentsRef.child(commentId).remove(function(error) {
//  //  if (error === null) {
//  //    actions.updateCommentCount(postId, -1);
//  //  }
//  //});
//};
//
//
///* API Actions
// ===============================*/
//PostsActions.listenToPosts.listen(function(pageNum, sortOption) {
//  var query = {
//    offset:pageNum,
//    limit:200,
//    sortOption: sortOption||'time'
//  };
//
//  _requestGet('/posts', query);
//
//});


module.exports = PostsActions;
