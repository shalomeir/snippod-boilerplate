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

export default getBrowserLang;
