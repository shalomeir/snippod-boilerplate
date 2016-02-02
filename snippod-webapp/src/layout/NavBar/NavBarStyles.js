import semanticVar from 'theme/semantic-variables';

const Styles = {
  navBarSubDiv: {
    marginBottom: '4px',
    display: 'table-cell',
    verticalAlign: 'middle',
  },

  title: {
    color: semanticVar['@textColor'],
    fontSize: semanticVar['@absoluteBorderRadius'],
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
