import { merge } from 'lodash';
import { union } from 'lodash';
import { omit } from 'lodash';

//This function is a clone of redux/examples/real-world/reducers/paginate
// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({ types, subTypes, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (!Array.isArray(subTypes) || subTypes.length !== 4) {
    throw new Error('Expected sub types to be an array of four elements.');
  }
  if (!subTypes.every(t => typeof t === 'string')) {
    throw new Error('Expected sub types to be strings.');
  }
  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;
  const [addItemToTopType, addItemToBottomType, deleteItemType, deleteAllItemsType] = subTypes;

  function updatePagination(state = {
    isFetching: false,
    nextPageUrl: undefined,
    pageCount: 0,
    ids: []
  }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          isFetching: true
        });
      case successType:
        return merge({}, state, {
          isFetching: false,
          ids: union(state.ids, action.response.result),
          nextPageUrl: action.response.nextPageUrl ? action.response.nextPageUrl : null,
          pageCount: state.pageCount + 1
        });
      case failureType:
        return merge({}, state, {
          isFetching: false
        });
      case addItemToTopType:
        return merge({}, state, {
          ids: union([action.id], state.ids)
        });
      case addItemToBottomType:
        return merge({}, state, {
          ids: union(state.ids, action.id)
        });
      case deleteItemType:
        return merge({}, state, {
          ids: state.ids.filter(e => e !== action.id)
        });

      default:
        return state;
    }
  }

  return function updatePaginationByKey(state = {}, action) {

    const { RELOAD_PAGE } = require('ducks/application/application');
    const { INIT_ALL_STATE, DELETE_ALL_PAGINATIONS } = require('ducks/globalActions');
    const key = mapActionToKey(action);

    switch (action.type) {
      case RELOAD_PAGE:
      case INIT_ALL_STATE:
      case DELETE_ALL_PAGINATIONS:
        return {};
      case requestType:
      case successType:
      case failureType:
      case addItemToTopType:
      case addItemToBottomType:
      case deleteItemType:
        if (typeof key !== 'string' && typeof key !== 'number') {
          throw new Error('Expected key to be a string or number type.');
        }
        return merge({}, state, {
          [key]: updatePagination(state[key], action)
        });
      case deleteAllItemsType:
        if (!key) {
          return {};
        }
        if (typeof key !== 'string' && typeof key !== 'number') {
          throw new Error('Expected key to be a string or number type.');
        }

        return merge({}, omit(state, key));
      default:
        return state;
    }
  };
}
