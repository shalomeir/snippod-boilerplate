'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.getWindowScrollPosition = getWindowScrollPosition;
exports.setWindowScrollPosition = setWindowScrollPosition;
exports.supportsHistory = supportsHistory;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports.canUseDOM = canUseDOM;

function addEventListener(node, type, listener) {
  if (node.addEventListener) {
    node.addEventListener(type, listener, false);
  } else {
    node.attachEvent('on' + type, listener);
  }
}

function removeEventListener(node, type, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(type, listener, false);
  } else {
    node.detachEvent('on' + type, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search;
}

function getWindowScrollPosition() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

function setWindowScrollPosition(scrollX, scrollY) {
  window.scrollTo(scrollX, scrollY);
}

/**
 * taken from modernizr
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}