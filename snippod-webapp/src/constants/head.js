const title = 'Snippod boilerplate';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const head = {
  title,
  titleTemplate: '%s | Snippod Boilerplate ',
  base: { 'target': '_blank', 'href': 'http://shalomeir.com/' },
  link: [
    { 'rel': 'canonical', 'href': 'http://shalomeir.com/' },
    { 'rel': 'apple-touch-icon', 'href': 'http://mysite.com/img/apple-touch-icon-57x57.png' },
    { 'rel': 'apple-touch-icon', 'sizes': '72x72', 'href': 'http://mysite.com/img/apple-touch-icon-72x72.png' }
  ],
  meta: [
    { name: 'description', content: description },
    { charset: 'utf-8' },
    { property: 'og:site_name', content: title },
    { property: 'og:image', content: image },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'twitter:card', content: 'summary' },
    { property: 'twitter:site', content: '@shalomeir' },
    { property: 'twitter:creator', content: '@shalomeir' },
    { property: 'twitter:title', content: title },
    { property: 'twitter:description', content: description },
    { property: 'twitter:image', content: image },
    { property: 'twitter:image:width', content: '200' },
    { property: 'twitter:image:height', content: '200' },
  ]
};

module.exports = head;
