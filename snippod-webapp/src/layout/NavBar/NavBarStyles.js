import SnippodRawTheme from '../../theme/snippod-raw-theme-boilerplate';


const Styles = {
  navBarSubDiv: {
    height: SnippodRawTheme.spacing.desktopKeylineIncrement - 8,
    marginBottom: '4px',
    display: 'table-cell',
    verticalAlign: 'middle',
  },

  title: {
    color: 'red',
    fontSize: '1.1em'
  },

  logoImage: {
    marginRight: '1.2em',
  },

  //Material UI Component Style
  flatButton: {
    //hoverColor: SnippodRawTheme.palette.accent2Color,

    style: {
      fontWeight: 300,
    }
  },

};

module.exports = Styles;
