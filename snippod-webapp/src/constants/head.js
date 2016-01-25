const title = 'Snippod boilerplate';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const head = {
  title,
  description,
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'boilerpl ate.snippod.com' },
    { property: 'og:title', content: title },
    { property: 'og:site_name', content: title },
    { property: 'og:image', content: image },
    { property: 'og:locale', content: 'en_US' },
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
