import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import merge from 'lodash/object/merge';
//import multireducer from 'multireducer';

import reduxForm from './reduxform/reduxForm';
import errorMessage from './messages/errorMessage';
import toastMessage from './messages/toastMessage';
import application from './application/application';
import auth from './authentication/auth';
import postings from './posts';

//Root Entities for normalization json schema
const initialEntitiesState = {
  accounts: {},
  posts: {},
  comments: {}
};

//Updates an entity cache in response to any action with response.entities.
function entities(state = initialEntitiesState, action = {}) {
  const { RELOAD_PAGE } = require('ducks/application/application');
  const { INIT_ALL_STATE, DELETE_ALL_ENTITIES, UPDATE_ENTITIY } = require('ducks/globalActions');

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  switch (action.type) {
    case UPDATE_ENTITIY:
      if (typeof action.kind !== 'string') {
        throw new Error('Expected entity kind to be a string.');
      }
      if (!action.id) {
        throw new Error('Expected entity id.');
      }
      if (!action.entity) {
        throw new Error('Expected entity object.');
      }
      return merge({}, state, { [action.kind]: { [action.id]: action.entity } });

    case RELOAD_PAGE:
    case INIT_ALL_STATE:
    case DELETE_ALL_ENTITIES:
      return {
        initialEntitiesState
      };

    default:
      return state;
  }
}

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  form: reduxForm,
  messages: combineReducers({
    errorMessage,
    toastMessage
  }),
  application,
  auth,
  entities,
  postings
});
