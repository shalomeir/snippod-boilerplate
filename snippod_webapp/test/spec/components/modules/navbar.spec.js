/**
*   Navbar Component Spec Test
*/


'use strict';

var React = require('react');
var NavbarComponent = React.createFactory(require('../../../../client/scripts/components/navbar/Navbar.jsx'));

describe('Navbar Component', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
    reactRender = ReactTestUtils.renderIntoDocument;
    this.navbarComponent = new NavbarComponent();
  });

  it('provides the "Navbar Component" instance', function() {
    // Expect it to exist
    expect(this.navbarComponent).toBeDefined();
  });

});
