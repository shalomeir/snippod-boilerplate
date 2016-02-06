import { getQueryParameters } from 'utils/handleString';

export const getBrowserLang = () => {
  let lang = 'en';
  if (!__SERVER__) {
    lang = navigator.language;
    //lang = lang[1] ? `${lang[0]}-${lang[1].toUpperCase()}` : navigator.language;
    lang = lang.split('-')[0];
  }
  return lang;
};

export const getBrowserLanguage = () => {
  let language = 'en_US';
  if (!__SERVER__) {
    language = navigator.language;
    //lang = lang[1] ? `${lang[0]}-${lang[1].toUpperCase()}` : navigator.language;
  }
  return language;
};

export const getUrlLang = () => {
  let lang = 'en';
  if (!__SERVER__ && window.location) {
    lang = getQueryParameters(window.location.search).language;
    if (!lang) {
      lang = 'en';
    }
    lang = lang.split('-')[0];
  }
  return lang;
};

export const getUrlLanguage = () => {
  let language = 'en_US';
  if (!__SERVER__ && window.location) {
    language = getQueryParameters(window.location.search).language;
    if (!language) {
      language = 'en_US';
    }
  }
  return language;
};

export const getDefaultLang = () => {
  let lang = 'en';
  if (!__SERVER__ && window.location) {
    lang = getQueryParameters(window.location.search).language;
    if (!lang) {
      lang = navigator.language;
    }
    lang = lang.split('-')[0];
  }
  return lang;
};

export default getDefaultLang;
