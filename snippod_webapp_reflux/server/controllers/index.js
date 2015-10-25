/**
 * Index Controller
 */

'use strict';

var settings = require('../config/env/default');
var path = require('path');

var indexController = function(req, res) {
  // Render index.html to allow application to handle routing
  res.sendFile(path.join(settings.staticAssets, '/index.html'), { root: settings.root });
};

module.exports = {
  index: indexController
};
