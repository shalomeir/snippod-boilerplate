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

  cardBoxShadow: {
    boxShadow: '0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5'
  },

  paddingBySize: {
    padding: '3em', //very padded
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      padding: '1.5em'
    }
  }

};

module.exports = radiumStyles;
