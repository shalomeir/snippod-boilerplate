#!/usr/bin/env node

//FIXME: Do not use Node.js server now
// This is Node.js api Server for async fetch actions data.
// snippod boilerplate not use this file.

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}
require('../server.babel'); // babel registration (runtime transpilation for node)
require('../api/api');
