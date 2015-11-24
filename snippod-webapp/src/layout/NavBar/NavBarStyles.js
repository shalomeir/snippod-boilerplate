import SnippodRawTheme from '../../theme/snippod-raw-theme-boilerplate';
const Colors = require('material-ui/lib/styles/colors');


const Styles = {
  navBarSubDiv: {
    height: SnippodRawTheme.spacing.desktopKeylineIncrement - 8,
    marginBottom: '4px',
    display: 'table-cell',
    verticalAlign: 'middle',
  },

  title: {
    display: 'none',
  },

  logo: {
    color: Colors.white,
    fontSize: SnippodRawTheme.spacing.iconSize,
    transition: 'all 200ms',
    ':hover': {
      color: Colors.blueGrey200,
    },
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

};

module.exports = Styles;
