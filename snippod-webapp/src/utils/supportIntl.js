import { addLocaleData } from 'react-intl';
import en from 'react-intl/lib/locale-data/en';
import ko from 'react-intl/lib/locale-data/ko';
import ja from 'react-intl/lib/locale-data/ja';
import zh from 'react-intl/lib/locale-data/zh';
import ru from 'react-intl/lib/locale-data/ru';
import de from 'react-intl/lib/locale-data/de';
import it from 'react-intl/lib/locale-data/it';

addLocaleData(en);
addLocaleData(ko);
addLocaleData(ja);
addLocaleData(zh);
addLocaleData(ru);
addLocaleData(de);
addLocaleData(it);

// All modern browsers, expect `Safari`, have implemented
// the `ECMAScript Internationalization API`.
// For that we need to patch in on runtime.
if (!global.Intl) {
  //require.ensure(['intl'], require => {
  //  require('intl');
  //}, 'IntlBundle');
  require('intl');
}
