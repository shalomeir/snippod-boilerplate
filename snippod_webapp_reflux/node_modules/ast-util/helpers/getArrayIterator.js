(function(array) {
  var index = 0;
  return {
    next: function() {
      if (index < array.length) {
        return {
          done: false,
          value: array[index++]
        };
      } else {
        return {
          done: true,
          value: void 0
        };
      }
    }
  };
});
