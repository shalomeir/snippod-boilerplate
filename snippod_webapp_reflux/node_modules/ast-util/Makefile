SHELL=bash

all: lib/helpers/get.js lib/helpers/getIterator.js lib/helpers/getArrayIterator.js lib/helpers/getIteratorRange.js

lib/helpers/get.js: helpers/get.js Makefile
	@mkdir -p lib/helpers
	@echo "var b = require('ast-types').builders;" > $@
	@echo 'module.exports = function(scope) {' >> $@
	@echo -n '  return ' >> $@
	./bin/make-builder < $< >> $@
	@echo '};' >> $@

lib/helpers/getIterator.js: helpers/getIterator.js Makefile
	@mkdir -p lib/helpers
	@echo "var b = require('ast-types').builders;" > $@
	@echo 'module.exports = function(scope) {' >> $@
	@echo "  var getArrayIterator = require('..').getArrayIterator;" >> $@
	@echo >> $@
	@echo -n '  return ' >> $@
	./bin/make-builder 'getArrayIterator=getArrayIterator(scope)' < $< >> $@
	@echo '};' >> $@

lib/helpers/getArrayIterator.js: helpers/getArrayIterator.js Makefile
	@mkdir -p lib/helpers
	@echo "var b = require('ast-types').builders;" > $@
	@echo 'module.exports = function(scope) {' >> $@
	@echo -n '  return ' >> $@
	./bin/make-builder < $< >> $@
	@echo '};' >> $@

lib/helpers/getIteratorRange.js: helpers/getIteratorRange.js Makefile
	@mkdir -p lib/helpers
	@echo "var b = require('ast-types').builders;" > $@
	@echo 'module.exports = function(scope) {' >> $@
	@echo -n '  return ' >> $@
	./bin/make-builder < $< >> $@
	@echo '};' >> $@

clean:
	rm -rf lib/helpers

test: all
	npm test

.PHONY: clean test
