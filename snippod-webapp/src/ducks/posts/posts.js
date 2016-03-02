const debug = require('utils/getDebugger')('posts');
import { switchLangAndDeleteLanguageQuery, reloadPage } from 'ducks/application/application';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';
import Schemas from './Schemas';

const POST_REQUEST = 'posts/posts/POST_REQUEST';
const POST_SUCCESS = 'posts/posts/POST_SUCCESS';
const POST_FAILURE = 'posts/posts/POST_FAILURE';

export const POST_ARRAY = [
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE
];

const POSTS_BY_SORTING_OPTION_REQUEST = 'posts/posts/POSTS_BY_SORTING_OPTION_REQUEST';
const POSTS_BY_SORTING_OPTION_SUCCESS = 'posts/posts/POSTS_BY_SORTING_OPTION_SUCCESS';
const POSTS_BY_SORTING_OPTION_FAILURE = 'posts/posts/POSTS_BY_SORTING_OPTION_FAILURE';

export const POSTS_BY_SORTING_OPTION_ARRAY = [
  POSTS_BY_SORTING_OPTION_REQUEST,
  POSTS_BY_SORTING_OPTION_SUCCESS,
  POSTS_BY_SORTING_OPTION_FAILURE
];

const POSTS_BY_ACCOUNT_REQUEST = 'posts/posts/POSTS_BY_ACCOUNT_REQUEST';
const POSTS_BY_ACCOUNT_SUCCESS = 'posts/posts/POSTS_BY_ACCOUNT_SUCCESS';
const POSTS_BY_ACCOUNT_FAILURE = 'posts/posts/POSTS_BY_ACCOUNT_FAILURE';

export const POSTS_BY_ACCOUNT_ARRAY = [
  POSTS_BY_ACCOUNT_REQUEST,
  POSTS_BY_ACCOUNT_SUCCESS,
  POSTS_BY_ACCOUNT_FAILURE
];

// Fetches a single repository from REST API.
// Relies on the custom API middleware defined in ../middleware/clientMiddleware and helpers/ApiClient.js.
function fetchPost(postId) {
  return {
    types: POST_ARRAY,
    promise: (client) => client.get('/posts/' + postId + '/', {
      schema: Schemas.POST
    })
  };
}

// Fetches a single post from REST API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadPost(postId, requiredFields = []) {
  return (dispatch, getState) => {
    const post = getState().entities.posts[postId];
    if (post && requiredFields.every(key => post.hasOwnProperty(key))) {
      return null;
    }

    return dispatch(fetchPost(postId));
  };
}


function fetchPostsBySortingOption(sortingOption, nextPageUrl) {
  return {
    key: sortingOption,
    types: POSTS_BY_SORTING_OPTION_ARRAY,
    promise: (client) => client.get(nextPageUrl, {
      schema: Schemas.POST_ARRAY
    })
  };
}

// Relies on Redux Thunk middleware.
export function loadPostsBySortingOption(sortingOption, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = '/posts/?sorting=' + sortingOption,
      pageCount = 0
      } = getState().postings.postsBySortingOption[sortingOption] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchPostsBySortingOption(sortingOption, nextPageUrl));
  };
}

function fetchPostsByAccount(accountId, nextPageUrl) {
  return {
    key: accountId,
    types: POSTS_BY_ACCOUNT_ARRAY,
    promise: (client) => client.get(nextPageUrl, {
      schema: Schemas.POST_ARRAY
    })
  };
}

// Relies on Redux Thunk middleware.
export function loadPostsByAccount(accountId, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = '/user/' + accountId + '/posts/',
      pageCount = 0
      } = getState().postings.postsByAccount[accountId] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchPostsByAccount(accountId, nextPageUrl));
  };
}
