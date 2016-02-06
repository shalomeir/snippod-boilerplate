const debug = require('utils/getDebugger')('application');

const SHOW_LOGIN_DIALOG = 'application/application/SHOW_LOGIN_DIALOG';
const SHOW_REGISTER_DIALOG = 'application/application/SHOW_REGISTER_DIALOG';
const CLOSE_DIALOG = 'application/application/CLOSE_DIALOG';
const SWITCH_LANG = 'application/application/SWITCH_LANG';

//TODO: Only works in client Mode. Prepare SSR.
import { getDefaultLang } from '../../helpers/getBrowserSettings.js';
const defaultLang = getDefaultLang();

const initialState = {
  isShowOverlay: false,
  loginDialog: false,
  registerDialog: false,
  lang: defaultLang,
};


// Modal Window Overay switch reducers.
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case SHOW_LOGIN_DIALOG:
      return {
        ...state,
        isShowOverlay: true,
        loginDialog: true,
        registerDialog: false
      };
    case SHOW_REGISTER_DIALOG:
      return {
        ...state,
        isShowOverlay: true,
        loginDialog: false,
        registerDialog: true
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        isShowOverlay: false,
        loginDialog: false,
        registerDialog: false
      };
    case SWITCH_LANG:
      debug('switch lang to ' + action.lang);

      return {
        ...state,
        lang: action.lang
      };
    default:
      return state;
  }
}

// This function is used for override query url
export function overrideQuery(query) {
  return (dispatch, getState) => {
    const history = require('helpers/history');
    const location = getState().router.location;
    history.push({
      pathname: location.pathname,
      query: Object.assign(location.query, query),
      state: location.state
    });
  };
}

export function pushQuery(query) {
  return (dispatch, getState) => {
    const history = require('helpers/history');
    const location = getState().router.location;
    history.push({
      pathname: location.pathname,
      query,
      state: location.state
    });
  };
}

export function pushPathname(pathname) {
  return (dispatch, getState) => {
    const history = require('helpers/history');
    const location = getState().router.location;
    history.push({
      pathname,
      query: location.query,
      state: location.state
    });
  };
}

export function pushState(state) {
  return (dispatch, getState) => {
    const history = require('helpers/history');
    const location = getState().router.location;
    history.push({
      pathname: location.pathname,
      query: location.query,
      state
    });
  };
}

export function deleteQuery(queryKey) {
  return (dispatch, getState) => {
    const location = getState().router.location;
    const res = delete location.query[queryKey];
    if (res) {
      const history = require('helpers/history');
      history.push({
        pathname: location.pathname,
        query: location.query,
        state: location.state
      });
    }
    return res;
  };
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

export function switchLang(lang) {
  return {
    type: SWITCH_LANG,
    lang
  };
}

//thunk action that dispatch router.
export function switchLangAndQuery(lang) {
  return (dispatch, getState) => {
    dispatch(switchLang(lang));
    dispatch(overrideQuery({ language: lang }));
  };
}

//thunk action that dispatch router.
export function switchLangAndDeleteLanguageQuery(lang) {
  return (dispatch, getState) => {
    dispatch(switchLang(lang));
    dispatch(deleteQuery('language'));
  };
}
