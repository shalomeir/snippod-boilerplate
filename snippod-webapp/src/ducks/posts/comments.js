const debug = require('utils/getDebugger')('comments');
import { switchLangAndDeleteLanguageQuery, reloadPage } from 'ducks/application/application';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';
import Schemas from './Schemas';

const COMMENT_REQUEST = 'posts/posts/COMMENT_REQUEST';
const COMMENT_SUCCESS = 'posts/posts/COMMENT_SUCCESS';
const COMMENT_FAILURE = 'posts/posts/COMMENT_FAILURE';

export const COMMENT_ARRAY = [
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE
];

const COMMENTS_BY_POST_REQUEST = 'posts/posts/COMMENTS_BY_POST_REQUEST';
const COMMENTS_BY_POST_SUCCESS = 'posts/posts/COMMENTS_BY_POST_SUCCESS';
const COMMENTS_BY_POST_FAILURE = 'posts/posts/COMMENTS_BY_POST_FAILURE';

export const COMMENTS_BY_POST_ARRAY = [
  COMMENTS_BY_POST_REQUEST,
  COMMENTS_BY_POST_SUCCESS,
  COMMENTS_BY_POST_FAILURE
];

const COMMENTS_BY_ACCOUNT_REQUEST = 'posts/posts/COMMENTS_BY_ACCOUNT_REQUEST';
const COMMENTS_BY_ACCOUNT_SUCCESS = 'posts/posts/COMMENTS_BY_ACCOUNT_SUCCESS';
const COMMENTS_BY_ACCOUNT_FAILURE = 'posts/posts/COMMENTS_BY_ACCOUNT_FAILURE';

export const COMMENTS_BY_ACCOUNT_ARRAY = [
  COMMENTS_BY_ACCOUNT_REQUEST,
  COMMENTS_BY_ACCOUNT_SUCCESS,
  COMMENTS_BY_ACCOUNT_FAILURE
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
    types: COMMENTS_BY_SORTING_OPTION_ARRAY,
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
    types: COMMENTS_BY_ACCOUNT_ARRAY,
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
