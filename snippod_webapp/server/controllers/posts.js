///**
// * Main Controller
// */
//
//'use strict';
//
//var Post = require('mongoose').model('post');
//var User = require('mongoose').model('user');
//var auth = require('../auth');
//var validCheck = require('../utils/validCheck');
//
//
//// Create a static getTweets method to return tweet data from the db
//var getPosts = function(offset, limit, sortOption, callback) {
//
//  var posts = [];
//  var sortObj = {};
//  sortObj[sortOption] = -1;
//
//  // Query the db, using skip and limit to achieve page chunks
//  Post.find({},'-commentsNum -downvotes -favs',
//    {skip: offset, limit: limit}).sort(sortObj).exec(function(err,docs){
//
//    // If everything is cool...
//    if(!err) {
//      posts = docs;  // We got tweets
//    }
//    // Pass them back to the specified callback
//    callback(err, posts);
//  });
//
//};
//
///**
// * GET /posts
// * Read posts data.
// */
//var readPosts = function(req, res, next) {
//
//  var query = req.query;
//
//  getPosts(query.offset, query.limit, query.sortOption, function(err, posts) {
//    if (err) {
//      return next(err);
//    }
//    if (!posts) {
//      return res.status(400).json({
//        errors: [{
//          msg: 'No more posts.'
//        }]
//      });
//    }
//    if(posts.length===0) {
//      return res.status(200).json({
//        info: [{
//          msg: 'No more posts.'
//        }]
//      });
//    }
//    res.status(200).json({
//      postsSnapshot: posts
//    });
//
//  });
//};
//
///**
// * POST /posts
// * Create a new post.
// * @param email
// * @param password
// * @param confirmPassword
// */
//
//var createPost = function(req, res, next) {
//
//  req.assert('url', 'url is not a url function').isURL();
//  //req.assert('creatorUID', 'You are not you').equals(req.body.creatorUID);
//
//  var errors = req.validationErrors();
//
//  if (errors) {
//    return res.status(400).json({
//      errors: errors
//    });
//  }
//
//  User.findById(req.user._id, '-password', function(err, user) {
//    if (err) {
//      return next(err);
//    }
//
//    var post = new Post({
//      creator: user.username,
//      creatorUID: user._id,
//      title: req.body.title,
//      url: req.body.url
//    });
//
//    post.save(function(err) {
//      if (err) {
//        return next(err);
//      }
//      // Send user and authentication token
//      res.status(200).json({
//        success: [{
//          msg: 'Post created successfully.'
//        }]
//      });
//    });
//  });
//
//
//};
//
///**
// * PUT /user
// * Update profile information.
// */
//
//var updateProfile = function(req, res, next) {
//  req.assert('email', 'Email is not valid').isEmail();
//
//  var errors = req.validationErrors();
//
//  if (errors) {
//    return res.status(400).json({
//      errors: errors
//    });
//  }
//
//  Post.findById(req.user._id, '-password', function(err, user) {
//    if (err) {
//      return next(err);
//    }
//
//    user.email = req.body.email || '';
//    user.firstName = req.body.firstName || '';
//    user.lastName = req.body.lastName || '';
//
//    user.save(function(err) {
//      if (err) {
//        return next(err);
//      }
//      res.status(200).json({
//        success: [{
//          msg: 'Profile information updated.'
//        }],
//        user: user
//      });
//    });
//  });
//};
//
///**
// * PUT /user/password
// * Update current password.
// * @param password
// * @param confirmPassword
// */
//
//var updatePassword = function(req, res, next) {
//  req.assert('password', 'Password must be at least 6 characters long').len(6);
//  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
//
//  var errors = req.validationErrors();
//
//  if (errors) {
//    return res.status(400).json({
//      errors: errors
//    });
//  }
//
//  Post.findById(req.user._id, function(err, user) {
//    if (err) {
//      return next(err);
//    }
//
//    user.password = req.body.password;
//
//    user.save(function(err) {
//      if (err) {
//        return next(err);
//      }
//      res.status(200).json({
//        success: [{
//          msg: 'Password has been changed.'
//        }]
//      });
//    });
//  });
//};
//
///**
// * DELETE /user
// * Delete current user authentication.
// */
//
//var deleteAccount = function(req, res, next) {
//  Post.findByIdAndRemove(req.user._id, function(err) {
//    if (err) {
//      return next(err);
//    }
//    res.status(200).json({
//      info: [{
//        msg: 'Your authentication has been deleted.'
//      }]
//    });
//  });
//};
//
//module.exports = {
//  readPosts: readPosts,
//  createPost: createPost,
//  updateProfile: updateProfile,
//  updatePassword: updatePassword,
//  deleteAccount: deleteAccount
//};
