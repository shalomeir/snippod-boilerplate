'use strict';

var Reflux = require('reflux'),
    postActions = require('../actions/postActions');

var postsPerPage = 200;

var postsStore = Reflux.createStore({

  listenables: postActions,

  init: function() {
    this.posts = [];
    this.currentPage = 1;
    this.nextPage = true;
    this.sortOptions = {
      currentValue: 'upvotes',
      values: {
        // values mapped to firebase locations
        'upvotes': 'upvotes',
        'newest': 'time',
        'comments': 'commentCount'
      }
    };
  },

  setSortBy: function(value) {
    this.sortOptions.currentValue = value;
  },

  listenToPostsCompleted: function(postsSnapshot) {
    this.updatePosts(postsSnapshot);
    //postsRef
    //  .orderByChild(this.sortOptions.values[this.sortOptions.currentValue])
    //  // + 1 extra post to determine whether another page exists
    //  .limitToLast((this.currentPage * postsPerPage) + 1)
    //  .on('value', this.updatePosts.bind(this));
  },

  stopListeningToPosts: function() {
    //postsRef.off();
  },

  updatePosts: function(postsSnapshot) {
    // posts is all posts through current page + 1
    var endAt = this.currentPage * postsPerPage;
    // accumulate posts in posts array
    var posts = [];
    postsSnapshot.forEach(function(postData) {
      var post = postData;
      post.id = postData.key;
      posts.unshift(post);
    });

    // if extra post doesn't exist, indicate that there are no more posts
    this.nextPage = (posts.length === endAt + 1);
    // slice off extra post
    this.posts = posts.slice(0, endAt);

    this.trigger({
      posts: this.posts,
      currentPage: this.currentPage,
      nextPage: this.nextPage,
      sortOptions: this.sortOptions
    });
  },

  getDefaultData: function() {
    return {
      posts: this.posts,
      currentPage: this.currentPage,
      nextPage: this.nextPage,
      sortOptions: this.sortOptions
    };
  }

});

module.exports = postsStore;
