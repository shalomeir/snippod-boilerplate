/**
*   Messages Store Spec Test
*/


'use strict';

var messagesStore = require('../../../client/scripts/stores/subs/GlobalMessagesStore');

describe('Messages Store', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
  });

  it('provides the "Messages Store"', function() {
    // Expect it to exist
    expect(messagesStore).toBeDefined();
  });

});
