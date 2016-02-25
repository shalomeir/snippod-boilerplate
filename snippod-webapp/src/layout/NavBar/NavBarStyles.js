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
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      marginRight: 'inherit'
    },
  },

  menuItem: {
    color: semanticVar['@lightSecondaryColor']
  },

};

module.exports = styles;
