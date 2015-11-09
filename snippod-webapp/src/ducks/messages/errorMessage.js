const RESET_ERROR_MESSAGE = 'messages/errorMessage/RESET_ERROR_MESSAGE';

// Updates error message to notify about the failed fetches.
export default function reducer(state = null, action = {}) {

  const { type, error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}
