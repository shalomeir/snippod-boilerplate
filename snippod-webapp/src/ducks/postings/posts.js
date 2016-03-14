const debug = require('utils/getDebugger')('posts');
import { updateEntity } from 'ducks/globalActions';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';
import Schemas from 'ducks/Schemas';
import { POSTS_BY_SORTING_OPTION, POSTS_BY_ACCOUNT } from 'ducks/postings';

/********************************
            get post
 ********************************/
const POST_REQUEST = 'posts/posts/POST_REQUEST';
const POST_SUCCESS = 'posts/posts/POST_SUCCESS';
const POST_FAILURE = 'posts/posts/POST_FAILURE';

export const POST_ARRAY = [
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE
];

// Fetches a single repository from REST API.
// Relies on the custom API middleware defined in ../middleware/clientMiddleware and helpers/ApiClient.js.
export function fetchPost(postId) {
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

/********************************
          submit post
 ********************************/
const SUBMIT_POST_REQUEST = 'posts/posts/SUBMIT_POST_REQUEST';
const SUBMIT_POST_SUCCESS = 'posts/posts/SUBMIT_POST_SUCCESS';
const SUBMIT_POST_FAILURE = 'posts/posts/SUBMIT_POST_FAILURE';

export const SUBMIT_POST_ARRAY = [
  SUBMIT_POST_REQUEST,
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_FAILURE
];

export function submitPost(submitPostForm) {
  return {
    types: SUBMIT_POST_ARRAY,
    promise: (client) => client.post('/posts/', {
      data: {
        title: submitPostForm.title,
        link: submitPostForm.link
      },
      schema: Schemas.POST
    })
  };
}


/********************************
          delete post
 ********************************/
const DELETE_POST_REQUEST = 'posts/posts/DELETE_POST_REQUEST';
const DELETE_POST_SUCCESS = 'posts/posts/DELETE_POST_SUCCESS';
const DELETE_POST_FAILURE = 'posts/posts/DELETE_POST_FAILURE';

export const DELETE_POST_ARRAY = [
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
];

function fetchDeletePost(postId) {
  return {
    types: DELETE_POST_ARRAY,
    promise: (client) => client.del('/posts/' + postId + '/')
  };
}

// Relies on Redux Thunk middleware.
export function deletePost(postId) {
  return (dispatch, getState) => {
    dispatch(fetchDeletePost(postId))
      .then(() => {
        const deletedPost = getState().entities.posts[postId];
        deletedPost.deleted = true;
        dispatch(updateEntity('posts', postId, deletedPost));
        dispatch(showDelayedToastMessage({
          type: 'info',
          title: toastMessages.deletePostTitle,
          body: Object.assign(toastMessages.deletePostBody, { values: { postTitle: deletedPost.title } })
        }, 30));
      })
    ;
  };
}

/********************************
          upvote post
 ********************************/
const UPVOTE_POST_REQUEST = 'posts/posts/UPVOTE_POST_REQUEST';
const UPVOTE_POST_SUCCESS = 'posts/posts/UPVOTE_POST_SUCCESS';
const UPVOTE_POST_FAILURE = 'posts/posts/UPVOTE_POST_FAILURE';

export const UPVOTE_POST_ARRAY = [
  UPVOTE_POST_REQUEST,
  UPVOTE_POST_SUCCESS,
  UPVOTE_POST_FAILURE
];

export function upvotePost(postId) {
  return {
    types: UPVOTE_POST_ARRAY,
    promise: (client) => client.post('/posts/' + postId + '/upvote/', {
      schema: Schemas.POST
    })
  };
}

/********************************
    cancel upvote post
 ********************************/
const CANCEL_UPVOTE_POST_REQUEST = 'posts/posts/CANCEL_UPVOTE_POST_REQUEST';
const CANCEL_UPVOTE_POST_SUCCESS = 'posts/posts/CANCEL_UPVOTE_POST_SUCCESS';
const CANCEL_UPVOTE_POST_FAILURE = 'posts/posts/CANCEL_UPVOTE_POST_FAILURE';

export const CANCEL_UPVOTE_POST_ARRAY = [
  CANCEL_UPVOTE_POST_REQUEST,
  CANCEL_UPVOTE_POST_SUCCESS,
  CANCEL_UPVOTE_POST_FAILURE
];

export function cancelUpvotePost(postId) {
  return {
    types: CANCEL_UPVOTE_POST_ARRAY,
    promise: (client) => client.post('/posts/' + postId + '/cancel_upvote/', {
      schema: Schemas.POST
    })
  };
}

/********************************
 get postsBySortingOption pagination
 ********************************/
const POSTS_BY_SORTING_OPTION_REQUEST = 'posts/posts/POSTS_BY_SORTING_OPTION_REQUEST';
const POSTS_BY_SORTING_OPTION_SUCCESS = 'posts/posts/POSTS_BY_SORTING_OPTION_SUCCESS';
const POSTS_BY_SORTING_OPTION_FAILURE = 'posts/posts/POSTS_BY_SORTING_OPTION_FAILURE';

export const POSTS_BY_SORTING_OPTION_ARRAY = [
  POSTS_BY_SORTING_OPTION_REQUEST,
  POSTS_BY_SORTING_OPTION_SUCCESS,
  POSTS_BY_SORTING_OPTION_FAILURE
];

const ADD_POST_TO_TOP_AT_POSTS_BY_SORTING_OPTION = 'posts/posts/ADD_POST_TO_TOP_AT_POSTS_BY_SORTING_OPTION';
const ADD_POST_TO_BOTTOM_AT_POSTS_BY_SORTING_OPTION = 'posts/posts/ADD_POST_TO_BOTTOM_AT_POSTS_BY_SORTING_OPTION';
const DELETE_POST_AT_POSTS_BY_SORTING_OPTION = 'posts/posts/DELETE_POST_AT_POSTS_BY_SORTING_OPTION';
const DELETE_ALL_AT_POSTS_BY_SORTING_OPTION = 'posts/posts/DELETE_ALL_AT_POSTS_BY_SORTING_OPTION';

export const IO_POST_AT_POSTS_BY_SORTING_OPTION_ARRAY = [
  ADD_POST_TO_TOP_AT_POSTS_BY_SORTING_OPTION,
  ADD_POST_TO_BOTTOM_AT_POSTS_BY_SORTING_OPTION,
  DELETE_POST_AT_POSTS_BY_SORTING_OPTION,
  DELETE_ALL_AT_POSTS_BY_SORTING_OPTION
];

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

export function addPostToTopAtPostsBySortingOption(sortingOption, id) {
  return {
    key: sortingOption,
    type: ADD_POST_TO_TOP_AT_POSTS_BY_SORTING_OPTION,
    id
  };
}

export function addPostToBottomAtPostsBySortingOption(sortingOption, id) {
  return {
    key: sortingOption,
    type: ADD_POST_TO_BOTTOM_AT_POSTS_BY_SORTING_OPTION,
    id
  };
}

export function deletePostAtPostsBySortingOption(sortingOption, id) {
  return {
    key: sortingOption,
    type: DELETE_POST_AT_POSTS_BY_SORTING_OPTION,
    id
  };
}

export function deleteAllAtPostsBySortingOption(sortingOption = null) {
  return {
    key: sortingOption,
    type: DELETE_ALL_AT_POSTS_BY_SORTING_OPTION,
  };
}


/********************************
  get postsByAccount pagination
 ********************************/
const POSTS_BY_ACCOUNT_REQUEST = 'posts/posts/POSTS_BY_ACCOUNT_REQUEST';
const POSTS_BY_ACCOUNT_SUCCESS = 'posts/posts/POSTS_BY_ACCOUNT_SUCCESS';
const POSTS_BY_ACCOUNT_FAILURE = 'posts/posts/POSTS_BY_ACCOUNT_FAILURE';

export const POSTS_BY_ACCOUNT_ARRAY = [
  POSTS_BY_ACCOUNT_REQUEST,
  POSTS_BY_ACCOUNT_SUCCESS,
  POSTS_BY_ACCOUNT_FAILURE
];

const ADD_POST_TO_TOP_AT_POSTS_BY_ACCOUNT = 'posts/posts/ADD_POST_TO_TOP_AT_POSTS_BY_ACCOUNT';
const ADD_POST_TO_BOTTOM_AT_POSTS_BY_ACCOUNT = 'posts/posts/ADD_POST_TO_BOTTOM_AT_POSTS_BY_ACCOUNT';
const DELETE_POST_AT_POSTS_BY_ACCOUNT = 'posts/posts/DELETE_POST_AT_POSTS_BY_ACCOUNT';
const DELETE_ALL_AT_POSTS_BY_ACCOUNT = 'posts/posts/DELETE_ALL_AT_POSTS_BY_ACCOUNT';

export const IO_POST_AT_POSTS_BY_ACCOUNT_ARRAY = [
  ADD_POST_TO_TOP_AT_POSTS_BY_ACCOUNT,
  ADD_POST_TO_BOTTOM_AT_POSTS_BY_ACCOUNT,
  DELETE_POST_AT_POSTS_BY_ACCOUNT,
  DELETE_ALL_AT_POSTS_BY_ACCOUNT
];

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

export function addPostToTopAtPostsByAccount(accountId, id) {
  return {
    key: accountId,
    type: ADD_POST_TO_TOP_AT_POSTS_BY_ACCOUNT,
    id
  };
}

export function addPostToBottomAtPostsByAccount(accountId, id) {
  return {
    key: accountId,
    type: ADD_POST_TO_BOTTOM_AT_POSTS_BY_ACCOUNT,
    id
  };
}

export function deletePostAtPostsByAccount(accountId, id) {
  return {
    key: accountId,
    type: DELETE_POST_AT_POSTS_BY_ACCOUNT,
    id
  };
}

export function deleteAllAtPostsByAccount(accountId = null) {
  return {
    key: accountId,
    type: DELETE_ALL_AT_POSTS_BY_ACCOUNT,
  };
}

/********************************
          for posting
 ********************************/
// Relies on Redux Thunk middleware.
export function loadPosts(type, option, nextPage) {
  return (dispatch, getState) => {
    switch (type) {
      case POSTS_BY_SORTING_OPTION :
        return dispatch(loadPostsBySortingOption(option, nextPage));
      case POSTS_BY_ACCOUNT :
        return dispatch(loadPostsByAccount(option, nextPage));
      default:
        throw new Error('Expected postings pagination types.');
    }
  };
}

export function insertPostToPostsPagination(id) {
  return (dispatch, getState) => {
    dispatch(addPostToTopAtPostsBySortingOption('newest', id));
    dispatch(deleteAllAtPostsBySortingOption('comments'));
    dispatch(deleteAllAtPostsBySortingOption('upvotes'));
    dispatch(addPostToTopAtPostsByAccount(getState().auth.account.id, id));
  };
}
