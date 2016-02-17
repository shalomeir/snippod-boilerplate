const debug = require('utils/getDebugger')('application');
import { pushState, replaceState } from 'redux-router';

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


// Modal Window Overlay switch reducers.
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
    const location = getState().router.location;
    dispatch(pushState(
      location.state, location.pathname, Object.assign(location.query, query)
    ));
  };
}

export function pushQuery(query) {
  return (dispatch, getState) => {
    const location = getState().router.location;
    dispatch(pushState(location.state, location.pathname, query));
  };
}


//If defaultPathname and redirect query and nextPathname is not exist, do nothing.
export function redirectPath(defaultPathname) {

  return (dispatch, getState) => {
    const location = getState().router.location;
    let pathname = defaultPathname;

    if (location.query.redirect) {
      pathname = decodeURIComponent(location.query.redirect);
    } else if (location.state && location.state.nextPathname) {
      pathname = location.state.nextPathname;
    }

    if (pathname) {
      console.log('jebal ' + pathname);
      dispatch(pushState(null, pathname));
    }
  };
}

export function deleteQuery(queryKey) {

  return (dispatch, getState) => {
    const location = getState().router.location;
    const res = delete location.query[queryKey];
    if (res) {
      dispatch(pushState(location.state, location.pathname, location.query));
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
