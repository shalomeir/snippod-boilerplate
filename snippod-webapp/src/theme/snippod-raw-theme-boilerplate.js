const Colors = require('material-ui/lib/styles/colors');
const ColorManipulator = require('material-ui/lib/utils/color-manipulator');
const SnippodRawSpacing = require('./snippod-raw-theme-spacing');

/*
 *  This Theme is for the theme used in snippod-boilerplate. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

module.exports = {
  spacing: SnippodRawSpacing,
  palette: {
    primary1Color: Colors.blue700,
    primary2Color: Colors.blue400,
    primary3Color: Colors.blue200,
    accent1Color: Colors.blueA700,
    accent2Color: Colors.blueA400,
    accent3Color: Colors.blueA100,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.blueGrey50,
    canvasColor: Colors.blueGrey50,
    borderColor: Colors.grey800,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
  },
};
