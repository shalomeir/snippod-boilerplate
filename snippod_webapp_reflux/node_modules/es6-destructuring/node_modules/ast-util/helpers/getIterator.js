(function(iterable) {
  var sym = typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  if (typeof iterable[sym] === "function") {
    return iterable[sym]();
  } else if (typeof iterable === "object" || typeof iterable === "function") {
    return getArrayIterator(iterable);
  } else {
    throw new TypeError();
  }
});
