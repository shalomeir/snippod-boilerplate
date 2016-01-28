const debug = require('utils/getDebugger')('auth');
import { switchLocale } from 'ducks/application/application';

const LOAD = 'authentication/auth/LOAD';
const LOAD_SUCCESS = 'authentication/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'authentication/auth/LOAD_FAIL';

const LOGIN = 'authentication/auth/LOGIN';
const LOGIN_SUCCESS = 'authentication/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/auth/LOGIN_FAIL';

const LOGOUT = 'authentication/auth/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/auth/LOGOUT_FAIL';

const UPDATE_ACCOUNT_SETTINGS = 'authentication/auth/UPDATE_ACCOUNT_SETTINGS';
const UPDATE_ACCOUNT_SETTINGS_SUCCESS = 'authentication/auth/UPDATE_ACCOUNT_SETTINGS_SUCCESS';
const UPDATE_ACCOUNT_SETTINGS_FAIL = 'authentication/auth/UPDATE_ACCOUNT_SETTINGS_FAIL';

const UPDATE_ACCOUNT_PASSWORD = 'authentication/auth/UPDATE_ACCOUNT_PASSWORD';
const UPDATE_ACCOUNT_PASSWORD_SUCCESS = 'authentication/auth/UPDATE_ACCOUNT_PASSWORD_SUCCESS';
const UPDATE_ACCOUNT_PASSWORD_FAIL = 'authentication/auth/UPDATE_ACCOUNT_PASSWORD_FAIL';

const DESTROY_ACCOUNT = 'authentication/auth/DESTROY_ACCOUNT';
const DESTROY_ACCOUNT_SUCCESS = 'authentication/auth/DESTROY_ACCOUNT_SUCCESS';
const DESTROY_ACCOUNT_FAIL = 'authentication/auth/DESTROY_ACCOUNT_FAIL';


const initialState = {
  loggedIn: false,
  loaded: false,
  loading: false,
  loggingIn: false,
  loggingOut: false,
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
      if (action.result) {
        return {
          ...state,
          loggedIn: true,
          loading: false,
          loaded: true,
          account: action.result.account,
        };
      }
      return {
        ...state,
        loggedIn: false,
        loading: false,
        loaded: true,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
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
        loggedIn: true,
        loggingIn: false,
        loaded: true,
        account: action.result.account,
        loginError: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
        loaded: true,
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
        loggedIn: false,
        account: null,
        logoutError: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case UPDATE_ACCOUNT_SETTINGS:
      return state;

    case UPDATE_ACCOUNT_SETTINGS_SUCCESS:
      return {
        ...state,
        account: action.result.account,
      };
    case UPDATE_ACCOUNT_SETTINGS_FAIL:
      return {
        ...state,
        error: action.error
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

//thunk action that dispatch login action and then dispatch follow action such as switch locale.
export function loginAndFollow(loginForm) {
  return (dispatch, getState) => {
    return dispatch(
      login(loginForm)
    ).then((result) => {
      dispatch(switchLocale(result.account.language.split('-')[0]));
    }).catch((error) => {
      debug('Error occured : ', error);
    });
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/auth/logout/')
  };
}

export function updateAccountSettings(account) {
  return {
    types: [UPDATE_ACCOUNT_SETTINGS, UPDATE_ACCOUNT_SETTINGS_SUCCESS, UPDATE_ACCOUNT_SETTINGS_FAIL],
    promise: (client) => client.patch('/accounts/' + account.id, {
      data: {
        account
      }
    })
  };
}
