const debug = require('utils/getDebugger')('comments');
import { switchLangAndDeleteLanguageQuery, reloadPage } from 'ducks/application/application';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';
import Schemas from './Schemas';

//get comment
const COMMENT_REQUEST = 'posts/comments/COMMENT_REQUEST';
const COMMENT_SUCCESS = 'posts/comments/COMMENT_SUCCESS';
const COMMENT_FAILURE = 'posts/comments/COMMENT_FAILURE';

export const COMMENT_ARRAY = [
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE
];

//submit comment
const SUBMIT_COMMENT_REQUEST = 'posts/comments/SUBMIT_COMMENT_REQUEST';
const SUBMIT_COMMENT_SUCCESS = 'posts/comments/SUBMIT_COMMENT_SUCCESS';
const SUBMIT_COMMENT_FAILURE = 'posts/comments/SUBMIT_COMMENT_FAILURE';

export const SUBMIT_COMMENT_ARRAY = [
  SUBMIT_COMMENT_REQUEST,
  SUBMIT_COMMENT_SUCCESS,
  SUBMIT_COMMENT_FAILURE
];

//get commentsByPost pagination
const COMMENTS_BY_POST_REQUEST = 'posts/comments/COMMENTS_BY_POST_REQUEST';
const COMMENTS_BY_POST_SUCCESS = 'posts/comments/COMMENTS_BY_POST_SUCCESS';
const COMMENTS_BY_POST_FAILURE = 'posts/comments/COMMENTS_BY_POST_FAILURE';

export const COMMENTS_BY_POST_ARRAY = [
  COMMENTS_BY_POST_REQUEST,
  COMMENTS_BY_POST_SUCCESS,
  COMMENTS_BY_POST_FAILURE
];

const ADD_COMMENT_TO_TOP_AT_COMMENTS_BY_POST = 'posts/comments/ADD_COMMENT_TO_TOP_AT_COMMENTS_BY_POST';
const ADD_COMMENT_TO_BOTTOM_AT_COMMENTS_BY_POST = 'posts/comments/ADD_COMMENT_TO_BOTTOM_AT_COMMENTS_BY_POST';
const DELETE_COMMENT_AT_COMMENTS_BY_POST = 'posts/comments/DELETE_COMMENT_AT_COMMENTS_BY_POST';
const DELETE_ALL_AT_COMMENTS_BY_POST = 'posts/comments/DELETE_ALL_AT_COMMENTS_BY_POST';

export const IO_COMMENT_AT_COMMENTS_BY_POST_ARRAY = [
  ADD_COMMENT_TO_TOP_AT_COMMENTS_BY_POST,
  ADD_COMMENT_TO_BOTTOM_AT_COMMENTS_BY_POST,
  DELETE_COMMENT_AT_COMMENTS_BY_POST,
  DELETE_ALL_AT_COMMENTS_BY_POST
];

//get commentsByAccount pagination
const COMMENTS_BY_ACCOUNT_REQUEST = 'posts/comments/COMMENTS_BY_ACCOUNT_REQUEST';
const COMMENTS_BY_ACCOUNT_SUCCESS = 'posts/comments/COMMENTS_BY_ACCOUNT_SUCCESS';
const COMMENTS_BY_ACCOUNT_FAILURE = 'posts/comments/COMMENTS_BY_ACCOUNT_FAILURE';

export const COMMENTS_BY_ACCOUNT_ARRAY = [
  COMMENTS_BY_ACCOUNT_REQUEST,
  COMMENTS_BY_ACCOUNT_SUCCESS,
  COMMENTS_BY_ACCOUNT_FAILURE
];

const ADD_COMMENT_TO_TOP_AT_COMMENTS_BY_ACCOUNT = 'posts/comments/ADD_COMMENT_TO_TOP_AT_COMMENTS_BY_ACCOUNT';
const ADD_COMMENT_TO_BOTTOM_AT_COMMENTS_BY_ACCOUNT = 'posts/comments/ADD_COMMENT_TO_BOTTOM_AT_COMMENTS_BY_ACCOUNT';
const DELETE_COMMENT_AT_COMMENTS_BY_ACCOUNT = 'posts/comments/DELETE_COMMENT_AT_COMMENTS_BY_ACCOUNT';
const DELETE_ALL_AT_COMMENTS_BY_ACCOUNT = 'posts/comments/DELETE_ALL_AT_COMMENTS_BY_ACCOUNT';

export const IO_COMMENT_AT_COMMENTS_BY_ACCOUNT_ARRAY = [
  ADD_COMMENT_TO_TOP_AT_COMMENTS_BY_ACCOUNT,
  ADD_COMMENT_TO_BOTTOM_AT_COMMENTS_BY_ACCOUNT,
  DELETE_COMMENT_AT_COMMENTS_BY_ACCOUNT,
  DELETE_ALL_AT_COMMENTS_BY_ACCOUNT
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
