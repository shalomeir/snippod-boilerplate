const debug = require('utils/getDebugger')('application');
import { browserHistory as history } from 'react-router';
import { showDelayedToastMessage } from 'ducks/messages/toastMessage';
import toastMessages from 'i18nDefault/toastMessages';

export const RELOAD_PAGE = 'application/application/RELOAD_PAGE';

const SHOW_POPUP_MODAL = 'application/application/SHOW_POPUP_MODAL';
const CLOSE_POPUP_MODAL = 'application/application/CLOSE_POPUP_MODAL';

const SHOW_LOGIN_DIALOG = 'application/application/SHOW_LOGIN_DIALOG';
const SHOW_REGISTER_DIALOG = 'application/application/SHOW_REGISTER_DIALOG';
const CLOSE_DIALOG = 'application/application/CLOSE_DIALOG';
const SWITCH_LANG = 'application/application/SWITCH_LANG';


//TODO: Only works in client Mode. Prepare SSR.
import { getDefaultLang } from '../../helpers/getBrowserSettings.js';
const defaultLang = getDefaultLang();

const initialState = {
  isShowModal: false,
  returnTo: null,
  isShowOverlay: false,
  loginDialog: false,
  registerDialog: false,
  lang: defaultLang,
  reloadedNum: 0,
};


// Modal Window Overlay switch reducers.
export default function reducer(state = initialState, action = {}) {

  const { INIT_ALL_STATE } = require('ducks/globalActions');

  switch (action.type) {
    case SHOW_POPUP_MODAL:
      return {
        ...state,
        isShowModal: true,
        returnTo: action.returnTo
      };
    case CLOSE_POPUP_MODAL:
      return {
        ...state,
        isShowModal: false,
        returnTo: null
      };
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

    case RELOAD_PAGE:
      return {
        ...state,
        reloadedNum: state.reloadedNum + 1,
        isShowModal: false,
        returnTo: null
      };

    case INIT_ALL_STATE:
      return initialState;

    default:
      return state;
  }
}

// This function is used for override query url
export function overrideQuery(query) {
  return (dispatch, getState) => {
    const location = getState().routing.location;
    history.replace({
      state: location.state ? location.state : null,
      pathname: location.pathname,
      query: Object.assign(location.query, query)
    });
  };
}

export function pushQuery(query) {
  return (dispatch, getState) => {
    const location = getState().routing.location;
    history.push({
      state: location.state ? location.state : null,
      pathname: location.pathname,
      query
    });
  };
}

export function deleteQuery(queryKey) {
  return (dispatch, getState) => {
    const location = getState().routing.location;
    if (location.query[queryKey]) {
      delete location.query[queryKey];
      history.push(location);
    }
  };
}

export function pushHistoryState(state) {
  return (dispatch, getState) => {
    const location = getState().routing.location;
    history.push({
      state,
      pathname: location.pathname,
      query: location.query
    });
  };
}

export function replaceHistoryState(state) {
  return (dispatch, getState) => {
    const location = getState().routing.location;
    history.replace({
      state,
      pathname: location.pathname,
      query: location.query
    });
  };
}

export function overrideNextPathname(nextPathname) {
  return (dispatch, getState) => {
    const location = getState().routing.location;
    const state = location.state ? location.state : {};
    history.replace({
      state: Object.assign(state, { nextPathname }),
      pathname: location.pathname,
      query: Object.assign(location.query, { redirect: encodeURIComponent(nextPathname) })
    });
  };
}

export function pushPath(pathname) {
  return () => {
    history.push(pathname);
  };
}

export function replacePath(pathname) {
  return () => {
    history.replace(pathname);
  };
}

export function pushPathWithQuery(pathname) {
  return (dispatch, getState) => {
    const location = getState().routing.location;
    history.push({
      pathname,
      query: location.query
    });
  };
}

export function pushLocation(location) {
  return () => {
    history.push(location);
  };
}

export function replaceLocation(location) {
  return () => {
    history.replace(location);
  };
}

export function reloadPage() {
  //Enhancement needed: Do you have any idea?
  //window.location.reload();
  return {
    type: RELOAD_PAGE,
  };
}

// https://github.com/reactjs/react-router/issues/1982
export function refreshPage() {
  return (dispatch, getState) => {
    const location = getState().routing.location;
    history.replace('/');
    history.replace(location.pathname);
  };
}

//If defaultPathname and redirect query and nextPathname is not exist, do nothing.
export function redirectPushPath(defaultPathname) {

  return (dispatch, getState) => {
    const location = getState().routing.location;
    let pathname = defaultPathname;

    if (location.query.redirect) {
      pathname = decodeURIComponent(location.query.redirect);
    } else if (location.state && location.state.nextPathname) {
      pathname = location.state.nextPathname;
    }

    if (pathname) {
      history.push(pathname);
    }
  };
}

export function redirectReplacePath(defaultPathname) {

  return (dispatch, getState) => {
    const location = getState().routing.location;
    let pathname = defaultPathname;

    if (location.query.redirect) {
      pathname = decodeURIComponent(location.query.redirect);
    } else if (location.state && location.state.nextPathname) {
      pathname = location.state.nextPathname;
    }

    if (pathname) {
      history.replace(pathname);
    }
  };
}

export function showPopupModal(returnTo) {
  return {
    type: SHOW_POPUP_MODAL,
    returnTo
  };
}

export function closePopupModal() {
  return {
    type: CLOSE_POPUP_MODAL
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
export function switchLangIfDiffrent() {
  return (dispatch, getState) => {
    const auth = getState().auth;
    if (auth.loggedIn) {
      const authLang = auth.account.language.split('-')[0];
      const currentLang = getState().application.lang;
      if (authLang !== currentLang) {
        dispatch(switchLang(authLang));
      }
    }
  };
}

//thunk action that dispatch router.
export function switchLangAndQuery(lang) {
  return (dispatch, getState) => {
    const currentLang = getState().application.lang;
    if (currentLang !== lang) {
      dispatch(switchLang(lang));
      dispatch(showDelayedToastMessage({
        type: 'info',
        title: toastMessages.switchLangTitle,
        body: Object.assign(toastMessages.switchLangBody, { values: { lang } })
      }, 500));
    }
    dispatch(overrideQuery({ language: lang }));
  };
}

//thunk action that dispatch router.
export function switchLangAndDeleteLanguageQuery(lang) {
  return (dispatch, getState) => {
    const currentLang = getState().application.lang;
    if (currentLang !== lang) {
      const languageName = (lang === 'ko') ? '한국어' : 'English';
      dispatch(switchLang(lang));
      dispatch(showDelayedToastMessage({
        type: 'info',
        title: toastMessages.switchLangTitle,
        body: Object.assign(toastMessages.switchLangBody, { values: { lang: languageName } })
      }, 500));
    }
    dispatch(deleteQuery('language'));
  };
}
