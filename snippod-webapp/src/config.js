module.exports = {
  development: {
    isProduction: false,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'snippod webapp boilerplate Development'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'snippod webapp boilerplate Production'
    }
  }
}[process.env.NODE_ENV || 'development'];
