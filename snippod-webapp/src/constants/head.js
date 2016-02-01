const title = 'Snippod boilerplate';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const head = {
  title,
  titleTemplate: '%s | Snippod Boilerplate ',
  //base: { 'target': '_blank', 'href': 'http://shalomeir.com/' },
  link: [
    { 'rel': 'canonical', 'href': 'http://shalomeir.com/' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '57x57', 'href': '/favicon/apple-icon-57x57.png' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '60x60', 'href': '/favicon/apple-icon-60x60.png' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '72x72', 'href': '/favicon/apple-icon-72x72.png' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '76x76', 'href': '/favicon/apple-icon-76x76.png' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '114x114', 'href': '/favicon/apple-icon-114x114.png' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '120x120', 'href': '/favicon/apple-icon-120x120.png' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '144x144', 'href': '/favicon/apple-icon-144x144.png' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '152x152', 'href': '/favicon/apple-icon-152x152.png' },
    //{ 'rel': 'apple-touch-icon', 'sizes': '180x180', 'href': '/favicon/apple-icon-180x180.png' },
    //{ 'rel': 'icon', 'type': 'image/png', 'sizes': '192x192', 'href': '/favicon/android-icon-192x192.png' },
    //{ 'rel': 'icon', 'type': 'image/png', 'sizes': '96x96', 'href': '/favicon/favicon-96x96.png' },
    { 'rel': 'icon', 'type': 'image/png', 'sizes': '32x32', 'href': '/favicon/favicon-32x32.png' },
    { 'rel': 'icon', 'type': 'image/png', 'sizes': '16x16', 'href': '/favicon/favicon-16x16.png' }
    //{ 'rel': 'manifest', 'href': '/favicon/manifest.json' }
  ],
  meta: [
    { name: 'description', content: description },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'msapplication-TileColor', content: '#0077be' },
    //{ name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
    { name: 'theme-color', content: '#0077be' },
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
    { property: 'twitter:image:height', content: '200' }
  ]
};

module.exports = head;
