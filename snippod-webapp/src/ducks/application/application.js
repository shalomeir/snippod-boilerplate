const debug = require('utils/getDebugger')('application');

const SHOW_LOGIN_DIALOG = 'application/application/SHOW_LOGIN_DIALOG';
const SHOW_REGISTER_DIALOG = 'application/application/SHOW_REGISTER_DIALOG';
const CLOSE_DIALOG = 'application/application/CLOSE_DIALOG';
const SWITCH_LANG = 'application/application/SWITCH_LANG';

//TODO: Only works in client Mode. Prepare SSR.
import { getBrowserLang } from '../../helpers/getBrowserSettings.js';
const browserLang = getBrowserLang();

const initialState = {
  isShowOverlay: false,
  loginDialog: false,
  registerDialog: false,
  lang: browserLang,
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
