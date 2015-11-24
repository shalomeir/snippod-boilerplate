const SHOW_LOGIN_DIALOG = 'application/application/SHOW_LOGIN_DIALOG';
const SHOW_REGISTER_DIALOG = 'application/application/SHOW_REGISTER_DIALOG';
const CLOSE_DIALOG = 'application/application/CLOSE_DIALOG';

const initialState = {
  isShowOverlay: false,
  loginDialog: false,
  registerDialog: false
};


// Modal Window Overay switch reducers.
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOGIN_DIALOG:
      return {
        isShowOverlay: true,
        loginDialog: true,
        registerDialog: false
      };
    case SHOW_REGISTER_DIALOG:
      return {
        isShowOverlay: true,
        loginDialog: false,
        registerDialog: true
      };
    case CLOSE_DIALOG:
      return {
        isShowOverlay: false,
        loginDialog: false,
        registerDialog: false
      };
    default:
      return state;
  }
}

export function showLoginDialog() {
  return {
    type: SHOW_LOGIN_DIALOG
  };
}

export function showRegisterDialog() {
  return {
    type: SHOW_REGISTER_DIALOG
  };
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG
  };
}
