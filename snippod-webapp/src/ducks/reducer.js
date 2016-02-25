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

function messages(state = initialEntitiesState, action = {}) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }
  return state;
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
  entities
});
