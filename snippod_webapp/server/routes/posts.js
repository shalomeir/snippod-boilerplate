///**
// * Posts Routes
// */
//
//'use strict';
//
//var postsController = require('../controllers/posts'),
//    auth = require('../auth');
//
//var routes = function(app) {
//
//  // Create
//  app.post('/posts', auth.isAuthenticated, postsController.createPost);
//
//  // Read
//  app.get('/posts', postsController.readPosts);
//
//  // Update profile
//  //app.put('/posts', auth.isAuthenticated, postsController.updateProfile);
//  //app.patch('/posts', auth.isAuthenticated, postsController.updateProfile);
//
//
//  // Delete
//  //app.delete('/posts', auth.isAuthenticated, postsController.deleteAccount);
//
//};
//
//module.exports = routes;
