Convert ES6 rest params to ES3:

```javascript
var join = function(joinStr, ...items) {
  return items.join(joinStr);
};
```

becomes:

```javascript
var join = function(joinStr) {
  var items = [].slice.call(arguments, 1);
  return items.join(joinStr);
};
```

### Usage

```javascript
var compile = require('es6-rest-params').compile;

var output = compile(mySource);  // outputs { code: "..." }

// or, for source maps:
var output = compile(mySource, {
  sourceFileName: 'foo.js',
  sourceMapName: 'foo.js.map'
});  // outputs { code: "...", map: {...} }
```

### Resources

[Source map example](http://sokra.github.io/source-map-visualization/#base64,LyoganNoaW50IGVzbmV4dDogdHJ1ZSAqLwovKiBnbG9iYWwgZXhwZWN0ICovCgp2YXIgam9pbiA9IGZ1bmN0aW9uKGpvaW5TdHIpIHsKICB2YXIgaXRlbXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7CiAgcmV0dXJuIGl0ZW1zLmpvaW4oam9pblN0cik7Cn07CgpleHBlY3Qoam9pbignICcsICdhJywgJ2InLCAnYycpKS50by5lcXVhbCgnYSBiIGMnKTsK,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdF9vdXQuanMubWFwIiwic291cmNlcyI6WyJyZXN0X291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDeEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7O0FBRWxCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUMzQjs7QUFFRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqc2hpbnQgZXNuZXh0OiB0cnVlICovXG4vKiBnbG9iYWwgZXhwZWN0ICovXG5cbnZhciBqb2luID0gZnVuY3Rpb24oam9pblN0ciwgLi4uaXRlbXMpIHtcbiAgcmV0dXJuIGl0ZW1zLmpvaW4oam9pblN0cik7XG59O1xuXG5leHBlY3Qoam9pbignICcsICdhJywgJ2InLCAnYycpKS50by5lcXVhbCgnYSBiIGMnKTtcbiJdfQ==,LyoganNoaW50IGVzbmV4dDogdHJ1ZSAqLwovKiBnbG9iYWwgZXhwZWN0ICovCgp2YXIgam9pbiA9IGZ1bmN0aW9uKGpvaW5TdHIsIC4uLml0ZW1zKSB7CiAgcmV0dXJuIGl0ZW1zLmpvaW4oam9pblN0cik7Cn07CgpleHBlY3Qoam9pbignICcsICdhJywgJ2InLCAnYycpKS50by5lcXVhbCgnYSBiIGMnKTsK)

Thanks to [Facebook's jstransform](https://github.com/facebook/jstransform/blob/master/visitors/es6-rest-param-visitors.js) for the implementation strategy :)
