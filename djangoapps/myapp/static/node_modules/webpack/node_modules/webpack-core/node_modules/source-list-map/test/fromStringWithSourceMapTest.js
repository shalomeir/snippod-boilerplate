var should = require("should");
var fs = require("fs");
var path = require("path");
var SourceListMap = require("../").SourceListMap;
var fromStringWithSourceMap = require("../").fromStringWithSourceMap;

describe("fromStringWithSourceMap", function() {
	fs.readdirSync(path.resolve(__dirname, "fixtures/from-to-tests")).filter(function(name) {
		return /\.input\.map$/.test(name);
	}).forEach(function(name) {
		it("should parse and generate " + name, function() {
			var MAP = JSON.parse(fs.readFileSync(path.resolve(__dirname, "fixtures/from-to-tests/" + name), "utf-8"));
			var GENERATED_CODE = fs.readFileSync(path.resolve(__dirname, "fixtures/from-to-tests/" + MAP.file), "utf-8");
			var EXPECTED_MAP = JSON.parse(fs.readFileSync(path.resolve(__dirname, "fixtures/from-to-tests/" + 
				name.replace(/\.input\.map$/, ".expected.map")), "utf-8"));
			var slm = fromStringWithSourceMap(GENERATED_CODE, MAP);
			var result = slm.toStringWithSourceMap({
				file: MAP.file
			});
			JSON.parse(JSON.stringify(result.map)).should.be.eql(EXPECTED_MAP);
			result.source.should.be.eql(GENERATED_CODE);
		});

	});
});
