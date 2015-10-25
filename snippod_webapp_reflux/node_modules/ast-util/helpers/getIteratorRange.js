(function(iterator, index, begin, len) {
  if (index > begin) {
    throw new RangeError();
  }
  if (typeof len === "undefined") {
    len = Infinity;
  }

  var range = [], end = begin + len;
  while (index < end) {
    var next = iterator.next();
    if (next.done) {
      break;
    }
    if (index >= begin) {
      range.push(next.value);
    }
    index++;
  }

  return {
    range: range,
    index: index
  };
});
