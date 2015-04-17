'use strict';

var Defaults = {

  route: '/',

  apiPath: 'api/v1',

  page: {
    title: 'Home',
    description: 'Page Component - default',
    keywords: null,
    location: '/',
    returnpage: '/'
  },

  user: {
    loggedIn: false,
    email: 'anonymous@snippod.com',
    first_name: '',
    last_name: '',
    username: 'anonymous',
    id:'',
    profile: {
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
