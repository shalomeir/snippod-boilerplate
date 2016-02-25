import semanticVar from 'theme/semantic-variables';

const radiumStyles = {

  hideAtMobile: {
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      display: 'none'
    }
  },

  showAtMobile: {
    display: 'none',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      display: 'inherit'
    }
  },

};

module.exports = radiumStyles;
