const debug = require('utils/getDebugger')('application');

const SHOW_LOGIN_DIALOG = 'application/application/SHOW_LOGIN_DIALOG';
const SHOW_REGISTER_DIALOG = 'application/application/SHOW_REGISTER_DIALOG';
const CLOSE_DIALOG = 'application/application/CLOSE_DIALOG';
const SWITCH_LOCALE = 'application/application/SWITCH_LOCALE';

//TODO: Only works in client Mode. Prepare SSR.
import { getBrowserLocale } from '../../helpers/getBrowserSettings.js';
const browserLocale = getBrowserLocale();

const initialState = {
  isShowOverlay: false,
  loginDialog: false,
  registerDialog: false,
  locale: browserLocale,
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
    case SWITCH_LOCALE:
      debug('swith locale');

      return {
        ...state,
        locale: action.locale
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

export function switchLocale(locale) {
  return {
    type: SWITCH_LOCALE,
    locale
  };
}
