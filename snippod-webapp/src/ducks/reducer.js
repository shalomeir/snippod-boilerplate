import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
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

import reduxForm from './reduxform/reduxForm';
import errorMessage from './messages/errorMessage';
import application from './application/application';
import auth from './authentication/auth';

export default combineReducers({
  entities,
  messages: errorMessage,
  auth,
  application,
  form: reduxForm,
  router,
});
