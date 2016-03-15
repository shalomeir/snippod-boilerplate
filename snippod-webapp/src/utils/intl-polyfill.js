import debug from 'debug';
const areIntlLocalesSupported = require('intl-locales-supported');
import { localesMyAppSupports } from '../constants/defaults';

export default (locales) => {
  if (!process.env.BROWSER) {
    if (global.Intl) {
      if (!areIntlLocalesSupported(localesMyAppSupports)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and patch the constructors we need with the polyfill's.
        const IntlPolyfill = require('intl');
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
      }
    } else {
      // No `Intl`: use and load polyfill
      global.Intl = require('intl');
      debug('koa')('Intl is not supported, so the polyfill has been loaded');
    }
  }
};
