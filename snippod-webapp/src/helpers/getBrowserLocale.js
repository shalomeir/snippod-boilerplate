export default () => {
  let locale = 'en';
  if (!__SERVER__) {
    locale = navigator.language.split('-');
    //locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;
    locale = locale[0];
  }
  return locale;
};
