export function shortenString(str, limitLength) {
  if (str.length > limitLength) {
    return str.substring(0, limitLength - 2) + '..';
  }
  return str;
}

export function simpleShortenString(str, limitLength) {
  if (str.length > limitLength) {
    return str.substring(0, limitLength);
  }
  return str;
}

/*eslint-disable*/
export function getQueryParameters(str) {
  return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
}

