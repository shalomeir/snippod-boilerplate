export const getBrowserLocale = () => {
  let locale = 'en';
  if (!__SERVER__) {
    locale = navigator.language;
    //locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;
    locale = locale.split('-')[0];
  }
  return locale;
};

export const getBrowserLanguage = () => {
  let language = 'en_US';
  if (!__SERVER__) {
    language = navigator.language;
    //locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;
  }
  return language;
};

export default getBrowserLocale;
