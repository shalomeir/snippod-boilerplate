const RESET_ERROR_MESSAGE = 'messages/errorMessage/RESET_ERROR_MESSAGE';

const initialState = {
  errorObject: null,
};

// Updates error message to notify about the failed fetches.
export default function reducer(state = initialState, action = {}) {
  const { INIT_ALL_STATE } = require('ducks/globalActions');

  if (action.error) {
    return {
      errorObject: action.error
    };
  }

  switch (action.type) {
    case RESET_ERROR_MESSAGE:
      return {
        errorObject: null,
      };

    case INIT_ALL_STATE:
      return initialState;

    default:
      return state;
  }
}

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}
