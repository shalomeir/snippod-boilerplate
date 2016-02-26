import semanticVar from 'theme/semantic-variables';

const styles = {
  title: {
    color: semanticVar['@darkPrimaryColor'],
    fontSize: '1.5rem',
    fontStyle: 'italic',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      fontSize: '0.9rem',
    },
  },

  logoImage: {
    marginRight: '1rem'
  },

  icon: {
    marginRight: '0.4rem',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      marginRight: 'inherit'
    },
  },

  menuItem: {
    color: semanticVar['@lightSecondaryColor']
  },

  mobileItem: {
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      paddingLeft: '0.8em',
      paddingRight: '0.8em'
    },
  },

  smallAtMobile: {
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      paddingLeft: '0.1em',
      paddingRight: '0.1em'
    },
  }

};

module.exports = styles;
