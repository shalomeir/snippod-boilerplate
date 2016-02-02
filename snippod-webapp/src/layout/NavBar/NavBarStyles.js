import semanticVar from 'theme/semantic-variables';

const Styles = {
  navBarSubDiv: {
    marginBottom: '4px',
    display: 'table-cell',
    verticalAlign: 'middle',
  },

  title: {
    color: semanticVar['@darkPrimaryColor'],
    fontSize: '1.5rem',
    fontStyle: 'italic'
  },

  logoImage: {
    marginRight: '1rem',
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
