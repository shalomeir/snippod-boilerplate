/**
*   Messages Component Spec Test
*/


'use strict';

var React = require('react');
var MessagesComponent = React.createFactory(require('../../../../client/scripts/components/subs/Messages.jsx'));

describe('Messages Component', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
    reactRender = ReactTestUtils.renderIntoDocument;
    this.messagesComponent = new MessagesComponent();
  });

  it('provides the "Messages Component" instance', function() {
    // Expect it to exist
    expect(this.messagesComponent).toBeDefined();
  });

});
