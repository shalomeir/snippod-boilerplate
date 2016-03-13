const debug = require('utils/getDebugger')('postings');
import { combineReducers } from 'redux';
import paginate from 'helpers/paginate';
import { POSTS_BY_SORTING_OPTION_ARRAY, IO_POST_AT_POSTS_BY_SORTING_OPTION_ARRAY,
  POSTS_BY_ACCOUNT_ARRAY, IO_POST_AT_POSTS_BY_ACCOUNT_ARRAY } from './posts';
import { COMMENTS_BY_POST_ARRAY, IO_COMMENT_AT_COMMENTS_BY_POST_ARRAY,
  COMMENTS_BY_ACCOUNT_ARRAY, IO_COMMENT_AT_COMMENTS_BY_ACCOUNT_ARRAY } from './comments';

export const POSTS_BY_SORTING_OPTION = 'postsBySortingOption';
export const POSTS_BY_ACCOUNT = 'postsByAccount';
export const COMMENTS_BY_POST = 'commentsByPost';
export const COMMENTS_BY_ACCOUNT = 'commentsByAccount';

const postings = combineReducers({
  [POSTS_BY_SORTING_OPTION]: paginate({
    mapActionToKey: action => action.key,
    types: POSTS_BY_SORTING_OPTION_ARRAY,
    subTypes: IO_POST_AT_POSTS_BY_SORTING_OPTION_ARRAY
  }),

  [POSTS_BY_ACCOUNT]: paginate({
    mapActionToKey: action => action.key,
    types: POSTS_BY_ACCOUNT_ARRAY,
    subTypes: IO_POST_AT_POSTS_BY_ACCOUNT_ARRAY
  }),

  [COMMENTS_BY_POST]: paginate({
    mapActionToKey: action => action.key,
    types: COMMENTS_BY_POST_ARRAY,
    subTypes: IO_COMMENT_AT_COMMENTS_BY_POST_ARRAY
  }),

  [COMMENTS_BY_ACCOUNT]: paginate({
    mapActionToKey: action => action.key,
    types: COMMENTS_BY_ACCOUNT_ARRAY,
    subTypes: IO_COMMENT_AT_COMMENTS_BY_ACCOUNT_ARRAY
  })

});

export default postings;
