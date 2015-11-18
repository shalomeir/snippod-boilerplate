const SHOW_LOGIN_MODAL_WINDOW = 'application/application/SHOW_LOGIN_MODAL_WINDOW';
const SHOW_REGISTER_MODAL_WINDOW = 'application/application/SHOW_REGISTER_MODAL_WINDOW';
const CLOSE_MODAL_WINDOW = 'application/application/CLOSE_MODAL_WINDOW';

const initialState = {
  showOverlay: false,
  loginModalWindow: false,
  registerModalWindow: false
};


// Modal Window Overay switch reducers.
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOGIN_MODAL_WINDOW:
      return {
        showOverlay: true,
        loginModalWindow: true,
        registerModalWindow: false
      };
    case SHOW_REGISTER_MODAL_WINDOW:
      return {
        showOverlay: true,
        loginModalWindow: false,
        registerModalWindow: true
      };
    case CLOSE_MODAL_WINDOW:
      return {
        showOverlay: false,
        loginModalWindow: false,
        registerModalWindow: false
      };
    default:
      return state;
  }
}

export function showLoginModalWindow() {
  return {
    type: SHOW_LOGIN_MODAL_WINDOW
  };
}

export function showRegisterModalWindow() {
  return {
    type: SHOW_REGISTER_MODAL_WINDOW
  };
}

export function closeModalWindow() {
  return {
    type: CLOSE_MODAL_WINDOW
  };
}
