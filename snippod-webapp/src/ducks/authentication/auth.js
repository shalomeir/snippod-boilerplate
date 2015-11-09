const LOAD = 'authentication/auth/LOAD';
const LOAD_SUCCESS = 'authentication/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'authentication/auth/LOAD_FAIL';
const LOGIN = 'authentication/auth/LOGIN';
const LOGIN_SUCCESS = 'authentication/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/auth/LOGIN_FAIL';
const LOGOUT = 'authentication/auth/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/auth/LOGOUT_FAIL';

const initialState = {
  loggedIn: false,
  loaded: false,
  loading: false,
  account: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        account: action.result.account
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result.account
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        account: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/auth/load_auth/')
  };
}

export function login(loginForm) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login/', {
      data: {
        email: loginForm.emailId,
        password: loginForm.password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/auth/logout/')
  };
}
