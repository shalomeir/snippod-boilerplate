import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import merge from 'lodash/object/merge';
//import multireducer from 'multireducer';

//Root Entities for normalization json schema
const initialEntitiesState = {
  users: {},
  posts: {},
  comments: {}
};

//Updates an entity cache in response to any action with response.entities.
function entities(state = initialEntitiesState, action = {}) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

import errorMessage from './messages/errorMessage';
import application from './application/application';
import auth from './authentication/auth';

export default combineReducers({
  router: routerStateReducer,
  entities,
  messages: errorMessage,
  application,
  auth
});
