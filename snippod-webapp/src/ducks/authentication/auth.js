const debug = require('utils/getDebugger')('auth');
import { switchLangAndDeleteLanguageQuery, reloadPage } from 'ducks/application/application';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';

const LOAD = 'authentication/auth/LOAD';
const LOAD_SUCCESS = 'authentication/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'authentication/auth/LOAD_FAIL';

const LOGIN = 'authentication/auth/LOGIN';
const LOGIN_SUCCESS = 'authentication/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/auth/LOGIN_FAIL';

const LOGOUT = 'authentication/auth/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'authentication/auth/LOGOUT_FAIL';

const REGISTER = 'authentication/auth/REGISTER';
const REGISTER_SUCCESS = 'authentication/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'authentication/auth/REGISTER_FAIL';

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
  account: null,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  const { INIT_ALL_STATE } = require('ducks/globalActions');

  switch (action.type) {
    case LOAD:
      return state;
    case LOAD_SUCCESS:
      if (action.response) {
        return {
          ...state,
          loggedIn: true,
          loaded: true,
          account: action.response.account,
        };
      }
      return {
        ...state,
        loggedIn: false,
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
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        account: action.response.account
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        account: null,
        error: action.error
      };
    case LOGOUT:
      return state;
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        account: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.error
      };
    case REGISTER:
      return state;
    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        account: action.response.account
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loggedIn: false,
        account: null,
        error: action.error
      };
    case UPDATE_ACCOUNT_SETTINGS:
      return state;

    case UPDATE_ACCOUNT_SETTINGS_SUCCESS:
      return {
        ...state,
        account: action.response.account,
      };
    case UPDATE_ACCOUNT_SETTINGS_FAIL:
      return {
        ...state,
        error: action.error
      };

    case INIT_ALL_STATE:
      return initialState;

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
  return (dispatch, getState) => {
    return dispatch({
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
      promise: (client) => client.post('/auth/login/', {
        data: {
          email: loginForm.emailId,
          password: loginForm.password
        },
        params: {
          language: getState().application.lang
        }
      })
    });
  };
}

// thunk action that dispatch login action and then dispatch follow action such as switch lang.
// TODO: Check return response or error. This is not use. Instead, login process is handled in react login dialog.
export function loginAndFollow(loginForm) {
  return (dispatch, getState) => {
    dispatch(
      login(loginForm)
    ).then((response) => {
      dispatch(switchLangAndDeleteLanguageQuery(response.account.language.split('-')[0]));
      dispatch(showDelayedToastMessage({
        type: 'info',
        title: toastMessages.loginTitle,
        body: Object.assign(toastMessages.loginBody, { values: { username: response.account.username } })
      }, 500));
      return response;
    }).catch((error) => {
      debug('Error occurred : ', error);
      return error;
    });
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/auth/logout/')
  };
}

export function logoutAndFollow() {
  return (dispatch, getState) => {
    dispatch(
      logout()
    ).then((response) => {
      dispatch(reloadPage());
      dispatch(showDelayedToastMessage({
        type: 'info',
        title: toastMessages.logoutTitle,
        body: toastMessages.logoutBody
      }, 100));
      return response;
    }).catch((error) => {
      debug('Error occurred : ', error);
      return error;
    });
  };
}

export function register(registerForm) {
  return (dispatch, getState) => {
    return dispatch({
      types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
      promise: (client) => client.post('/accounts/register/', {
        data: {
          email: registerForm.emailId,
          password: registerForm.password,
          confirmPassword: registerForm.confirmPassword,
          username: registerForm.username
        },
        params: {
          language: getState().application.lang
        }
      })
    });
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
