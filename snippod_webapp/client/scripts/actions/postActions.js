/**
 * Created by shalomeir on 15. 3. 17..
 */
'use strict';

var Reflux = require('reflux'),
    request = require('superagent'),
    serialize = require('form-serialize'),
    { getToken, setToken } = require('../utils/tokenControl');

var messagesActions = require('./messagesActions');

var postActions = Reflux.createActions({
  // post actions
  'upvotePost':{},
  'downvotePost':{},
  'submitPost':{},
  'deletePost':{},
  'setSortBy':{},
  // comment actions
  'upvoteComment': {},
  'downvoteComment': {},
  'updateCommentCount': {},
  'addComment': {},
  'deleteComment': {},

  // API actions
  'listenToProfile': {},
  'listenToPost': {},
  'listenToPosts': {asyncResult: true},
  'stopListeningToProfile': {},
  'stopListeningToPosts': {},
  'stopListeningToPost': {},

  //refresh Component
  'updateSortBy': {}
});


/* Auth Method
 ===============================*/

var _requestGet = function (action, query, callback) {
  //var token = getToken();

  request
    .get(action)
    .type('json')
    .query(query)
    //.set({
    //  'authorization': 'Bearer ' + token
    //})
    .end(function(res) {
      if (res.ok) {
        if (res.body && res.body.postsSnapshot) {
          var postsSnapshot = res.body.postsSnapshot;
          postActions.listenToPosts.completed(postsSnapshot);
        }
        else {
          postActions.listenToPosts.completed({});
        }

        if (callback && callback.success) {
          callback.success(res);
        }
      }
      else {
        if (callback && callback.error) {
          callback.error(res);
        }
      }
      if (callback && callback.complete) {
        callback.complete(res);
      }
    });
};


var _postForm = function(form, callback){
  var postData = serialize(form);
  var postUrl = form.getAttribute('action') || window.location.pathname;
  var token = getToken();
  var options = callback.options || {};

  request
    .post(postUrl)
    .type('form')
    .set({
      'authorization': 'Bearer ' + token,
      'X-Requested-With': 'XMLHttpRequest'
    })
    .send(postData)
    .end(function(res) {
      if (res.ok) {
        // If user needs to be updated
        //if (options.refresh) {
        //  //this.transitionTo('posts', { pageNum: 1 });
        //}
        messagesActions.setMessages(res.body);
        messagesActions.setError({});
      }
      else {
        if (callback && callback.error) {
          callback.error(res);
        }
        messagesActions.setError(res.body);
      }
      if (callback && callback.complete) {
        callback.complete(res);
      }
    });

};


/* Post Actions
 ===============================*/

postActions.submitPost.listen(function(form,callback) {
  var cb = callback || function() {};
  cb.options = {
    refresh: true
  };
  _postForm(form, cb);

});

postActions.deletePost.listen(function(postId) {
  //postsRef.child(postId).remove();
});

postActions.upvotePost.listen(function(userId, postId) {
  //postsRef.child(postId).child('upvotes').transaction(function(curr) {
  //  return (curr || 0) + 1;
  //}, function(error, success) {
  //  if (success) {
  //    // register upvote in user's profile
  //    usersRef.child(userId).child('upvoted').child(postId).set(true);
  //  }
  //});
});

postActions.downvotePost.listen(function(userId, postId) {
  //postsRef.child(postId).child('upvotes').transaction(function(curr) {
  //  return curr - 1;
  //}, function(error, success) {
  //  if (success) {
  //    // register upvote in user's profile
  //    usersRef.child(userId).child('upvoted').child(postId).remove();
  //  }
  //});
});


/* Comment Actions
 ===============================*/

postActions.updateCommentCount.preEmit = function(postId, n) {
  // updates comment count on post
  //postsRef.child(postId).child('commentCount').transaction(function(curr) {
  //  return curr + n;
  //});
};

postActions.upvoteComment.preEmit = function(userId, commentId) {
  //commentsRef.child(commentId).child('upvotes').transaction(function(curr) {
  //  return (curr || 0) + 1;
  //}, function(error, success) {
  //  if (success) {
  //    // register upvote in user's profile
  //    usersRef.child(userId).child('upvoted').child(commentId).set(true);
  //  }
  //});
};

postActions.downvoteComment.preEmit = function(userId, commentId) {
  //commentsRef.child(commentId).child('upvotes').transaction(function(curr) {
  //  return curr - 1;
  //}, function(error, success) {
  //  if (success) {
  //    // register upvote in user's profile
  //    usersRef.child(userId).child('upvoted').child(commentId).remove();
  //  }
  //});
};

postActions.addComment.preEmit = function(comment) {
  //commentsRef.push(comment, function(error) {
  //  if (error === null) {
  //    actions.updateCommentCount(comment.postId, 1);
  //  }
  //});
};

postActions.deleteComment.preEmit = function(commentId, postId) {
  //commentsRef.child(commentId).remove(function(error) {
  //  if (error === null) {
  //    actions.updateCommentCount(postId, -1);
  //  }
  //});
};


/* API Actions
 ===============================*/
postActions.listenToPosts.listen(function(pageNum, sortOption) {
  var query = {
    offset:pageNum,
    limit:200,
    sortOption: sortOption||'time'
  };

  _requestGet('/posts', query);

});


module.exports = postActions;
