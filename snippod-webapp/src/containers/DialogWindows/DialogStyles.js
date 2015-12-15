import SnippodRawTheme from '../../theme/snippod-raw-theme-boilerplate';
const Colors = require('material-ui/lib/styles/colors');


const Styles = {
  loginDialog: {
    width: 256 + 24 * 2 + 8,
  },

  dialogBodyStyle: {
    paddingTop: 12
  },

  //Material UI Component Style
  flatButton: {
    //hoverColor: SnippodRawTheme.palette.accent2Color,

    style: {
      color: Colors.white,
      backgroundColor: SnippodRawTheme.palette.primary1Color,
      textColor: Colors.white,
      fontWeight: 300,
    }
  },

  errorText: {
    init: {
      width: 252,
      height: 18,
      color: Colors.red700,
      fontSize: 12,
      textAlign: 'center',
      paddingRight: 12,
      transitionDuration: '1s',
    },

    changed: {
      color: Colors.red200,
    },

  }

};

module.exports = Styles;
