//'use strict';
//
//var router;
//// The trick is to assign module.exports before any require()s
//
//module.exports = {
//
//  makePath(to, params, query) {
//    return router.makePath(to, params, query);
//  },
//
//  makeHref(to, params, query) {
//    return router.makeHref(to, params, query);
//  },
//
//  transitionTo(to, params, query) {
//    router.transitionTo(to, params, query);
//  },
//
//  replaceWith(to, params, query) {
//    router.replaceWith(to, params, query);
//  },
//
//  goBack() {
//    router.goBack();
//  },
//
//  run(render) {
//    router.run(render);
//  }
//};
//
//// By the time route config is require()-d,
//// require('./router') already returns a valid object
//
//var { create: createRouter, HistoryLocation, HashLocation } = require('react-router'),
//  routes = require('./routes');
//
//router = createRouter({
//  location: process.env.NODE_ENV === 'production' ? HashLocation : HistoryLocation,
//  routes: routes
//});
