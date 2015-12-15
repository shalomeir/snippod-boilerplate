import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
//import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
  //Render DevTools in App
  //<DockMonitor toggleVisibilityKey="ctrl-h"
  //             changePositionKey="ctrl-q">
  //  <LogMonitor />
  //</DockMonitor>

  //Open DevTools in a New Window
  <LogMonitor theme="tomorrow" />
);

export default DevTools;
