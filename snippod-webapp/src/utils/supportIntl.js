import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import ja from 'react-intl/locale-data/ja';
import zh from 'react-intl/locale-data/zh';
import ru from 'react-intl/locale-data/ru';
import de from 'react-intl/locale-data/de';
import it from 'react-intl/locale-data/it';

addLocaleData(en);
addLocaleData(ko);
addLocaleData(ja);
addLocaleData(zh);
addLocaleData(ru);
addLocaleData(de);
addLocaleData(it);

//const areIntlLocalesSupported = require('intl-locales-supported');
//import { localesMyAppSupports } from '../constants/defaults';

// All modern browsers, expect `Safari`, have implemented
// the `ECMAScript Internationalization API`.
// For that we need to patch in on runtime.
if (global.Intl) {
  //if (!areIntlLocalesSupported(localesMyAppSupports)) {
  //  // `Intl` exists, but it doesn't have the data we need, so load the
  //  // polyfill and patch the constructors we need with the polyfill's.
  //  const IntlPolyfill = require('intl');
  //  Intl.NumberFormat = IntlPolyfill.NumberFormat;
  //  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  //}
} else {
  // No `Intl`: use and load polyfill
  global.Intl = require('intl');
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/ko.js'
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/ko.js');
  });
}
