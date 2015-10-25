/**
*   Signup Component Spec Test
*/


'use strict';

var React = require('react');
var SignupComponent = React.createFactory(require('../../../../client/scripts/components/authentication/signup.jsx'));

describe('Signup Component', function() {

  var ReactTestUtils;
  var reactRender;

  beforeEach(function() {
    ReactTestUtils = require('react/addons').addons.TestUtils;
    reactRender = ReactTestUtils.renderIntoDocument;
    this.signupComponent = new SignupComponent();
  });

  it('provides the "Signup Component" instance', function() {
    // Expect it to exist
    expect(this.signupComponent).toBeDefined();
  });

});
