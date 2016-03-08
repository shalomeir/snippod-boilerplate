import urlJoin from 'url-join';
import urlUtils from 'url';

export function addhttp(url) {
  const trimedUrl = url.trim();

  if (trimedUrl.startsWith('//')) {
    return urlJoin('http:', trimedUrl);
  }
  if (!/^(?:f|ht)tps?\:\/\//.test(trimedUrl)) {
    return 'http://' + trimedUrl;
  }
  return trimedUrl;
}

export function btoa(str) {
  let buffer;
  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = new Buffer(str.toString(), 'binary');
  }
  return buffer.toString('base64');
}

export function getGidFromUri(hostPath) {
  return btoa(encodeURIComponent(hostPath));
}

export function getHostPathFromUrl(url) {
  const parsedUrl = urlUtils.parse(url.trim(), true);
  return parsedUrl.host + parsedUrl.path;
}
