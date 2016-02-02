//This theme variables should be sync with semantic site variables such
//as 'semantic/src/site/globals/site.variables' or 'semantic/src/themes/default/globals/site.variables'.
//TODO: Sync by watch
const color = require('color');

const semanticVar = {
  '@relativeBorderRadius': 4 / 14 + 'em',
  '@absoluteBorderRadius': 4 / 14 + 'rem',
  '@primaryColor': '#2185D0', //blue
  '@lightPrimaryColor': '#54C8FF', //lightblue
  '@secondaryColor': '#1B1C1D', //black
  '@lightSecondaryColor': '#545454', //lightblack
  '@snippodColor': '#0077BE', //ocean boat blue

  '@lineHeight': '1.4285em',
  '@textColor': 'rgba(0, 0, 0, 0.87)',
};

const calculatedSemanticVar = {
  '@darkPrimaryColor': color(semanticVar['@primaryColor']).darken(0.1).hexString(),
};

export default Object.assign(semanticVar, calculatedSemanticVar);
