'use strict';

var Defaults = {

  route: '/',

  page: {
    title: 'Home',
    description: 'Page Component - default',
    keywords: null,
    location: '/',
    returnpage: '/'
  },

  user: {
    loggedIn: false,
    firstName: 'John',
    lastName: 'Doe',
    username: null,
    uid:'',
    profile: {
      username: '',
      upvoted: {}
    }
  },

  messages: {
    overlayMessages: null
  },

  topic: {
    tid: 'root',
    name: 'Snippod Root',
    description: 'Hello, This is Snippod\'s main page. Also, this is boilerpalte for Snippod service.',
    creator: 'snippod'
  },

  snips: {
    posts: [],
    currentPage: 1,
    nextPage: true,
    sortOptions: {
      currentValue: 'upvotes',
      values: {
        'upvotes': 'upvotes',
        'newest': 'time',
        'comments': 'commentCount'
      }
    }
  }



};

module.exports = Defaults;
