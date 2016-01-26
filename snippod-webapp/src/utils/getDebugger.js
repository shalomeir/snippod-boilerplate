import debug from 'debug';

export default (debuggerName) => {
  debug.enable(debuggerName);
  return debug(debuggerName);
};
