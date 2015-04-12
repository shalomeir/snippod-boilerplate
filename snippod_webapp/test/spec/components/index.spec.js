/**
*   Index Component Spec Test
*/


'use strict';

var React = require('react');
var IndexComponent = React.createFactory(require('../../../client/scripts/components/App.jsx'));

describe('Index Component', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
    reactRender = ReactTestUtils.renderIntoDocument;
    this.indexComponent = new IndexComponent();
  });

  it('provides the "Index Component" instance', function() {
    // Expect it to exist
    expect(this.indexComponent).toBeDefined();
  });

});
