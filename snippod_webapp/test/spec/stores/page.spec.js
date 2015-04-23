/**
*   Page Store Spec Test
*/


'use strict';

var pageStore = require('../../../client/scripts/stores/commons/PageStore');

describe('Page Store', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
  });

  it('provides the "Page Store"', function() {
    // Expect it to exist
    expect(pageStore).toBeDefined();
  });

});
