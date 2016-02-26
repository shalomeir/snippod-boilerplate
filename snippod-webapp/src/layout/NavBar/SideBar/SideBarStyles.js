import semanticVar from 'theme/semantic-variables';

const styles = {
  title: {
    color: semanticVar['@darkPrimaryColor'],
    fontSize: '1.5rem',
    fontStyle: 'italic'
  },

  logoImage: {
    marginRight: '1rem'
  },

  icon: {
    marginRight: '0.4rem',
  },

  menuItem: {
    color: semanticVar['@lightSecondaryColor']
  },

  welcome: {
    lineHeight: '2em'
  },

  iconText: {
    display: 'inline'
  },

  authButton: {
    width: '10em'
  },

  footerMessage: {
    lineHeight: '2.9em',
    fontSize: '0.9rem',
    color: '#767676',
  }

};

module.exports = styles;
