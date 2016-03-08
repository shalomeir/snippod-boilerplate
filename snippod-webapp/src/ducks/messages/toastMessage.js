const SHOW_TOAST_MESSAGE = 'messages/toastMessage/SHOW_TOAST_MESSAGE';
const RESET_TOAST_MESSAGES = 'messages/toastMessage/RESET_TOAST_MESSAGES';
const RESET_TOAST_MESSAGES_COMPLETE = 'messages/toastMessage/RESET_TOAST_MESSAGES_COMPLETE';

const initialState = {
  toastObject: null,
  toastNum: 0,
  resetToast: false
};

// Updates error message to notify about the failed fetches.
export default function reducer(state = initialState, action = {}) {
  const { INIT_ALL_STATE } = require('ducks/globalActions');

  switch (action.type) {
    case SHOW_TOAST_MESSAGE:
      return {
        ...state,
        toastObject: action.messageObject,
        toastNum: state.toastNum + 1,
        resetToast: false
      };
    case RESET_TOAST_MESSAGES:
      return {
        toastObject: null,
        resetToast: true
      };
    case RESET_TOAST_MESSAGES_COMPLETE:
      return {
        ...state,
        resetToast: false,
        toastNum: 0
      };

    case INIT_ALL_STATE:
      return initialState;

    default:
      return state;
  }
}

export function showToastMessage(messageObject) {
  return {
    type: SHOW_TOAST_MESSAGE,
    messageObject
  };
}

export function resetToastMessages() {
  return {
    type: RESET_TOAST_MESSAGES
  };
}

export function resetToastMessagesComplete() {
  return {
    type: RESET_TOAST_MESSAGES_COMPLETE
  };
}

//thunk action that dispatch. You have to use this when app would be remounted.
export function showDelayedToastMessage(messageObject, time) {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(showToastMessage(messageObject));
    }, time);
  };
}
