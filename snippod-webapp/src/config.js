require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'snippod boilerplate webapp',
    description: 'All the modern best practices in one example.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'snippod web application',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'snippod web app',
        'og:description': 'All the modern best practices in one example.',
        'twitter:card': 'summary',
        'twitter:site': '@shalomeir',
        'twitter:creator': '@shalomeir',
        'twitter:title': 'snippod webapp boilerplate',
        'twitter:description': 'All the modern best practices in one example.',
        'twitter:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
