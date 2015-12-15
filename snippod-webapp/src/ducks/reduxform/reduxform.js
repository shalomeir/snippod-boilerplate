import { reducer as formReducer } from 'redux-form';

const RESET_ALL_REDUX_FORM = 'reduxform/reduxForm/RESET_ALL_REDUX_FORM';

const reduxForm = formReducer.plugin({
  login: (state, action) => { // <------ 'login' is name of form given to reduxForm()
    switch (action.type) {
      case RESET_ALL_REDUX_FORM:
        return {
          // <----- clear all field
        };
      default:
        return state;
    }
  }
});

export default reduxForm;

// Resets the login form
export function resetAllReduxForm() {
  return {
    type: RESET_ALL_REDUX_FORM
  };
}
