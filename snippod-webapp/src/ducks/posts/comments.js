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
function fetchComment(commentId) {
  return {
    types: COMMENT_ARRAY,
    promise: (client) => client.get('/comments/' + commentId + '/', {
      schema: Schemas.COMMENT
    })
  };
}

// Fetches a single comment from REST API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadComment(commentId, requiredFields = []) {
  return (dispatch, getState) => {
    const comment = getState().entities.comments[commentId];
    if (comment && requiredFields.every(key => comment.hasOwnProperty(key))) {
      return null;
    }

    return dispatch(fetchComment(commentId));
  };
}


function fetchCommentsByPost(postId, nextPageUrl) {
  return {
    key: postId,
    types: COMMENTS_BY_POST_ARRAY,
    promise: (client) => client.get(nextPageUrl, {
      schema: Schemas.COMMENT_ARRAY
    })
  };
}

// Relies on Redux Thunk middleware.
export function loadCommentsByPost(postId, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = '/post/' + postId + '/comments/',
      pageCount = 0
      } = getState().postings.commentsByPost[postId] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchCommentsByPost(postId, nextPageUrl));
  };
}

function fetchCommentsByAccount(accountId, nextPageUrl) {
  return {
    key: accountId,
    types: COMMENTS_BY_ACCOUNT_ARRAY,
    promise: (client) => client.get(nextPageUrl, {
      schema: Schemas.COMMENT_ARRAY
    })
  };
}

// Relies on Redux Thunk middleware.
export function loadCommentsByAccount(accountId, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = '/user/' + accountId + '/comments/',
      pageCount = 0
      } = getState().postings.commentsByAccount[accountId] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchCommentsByAccount(accountId, nextPageUrl));
  };
}
