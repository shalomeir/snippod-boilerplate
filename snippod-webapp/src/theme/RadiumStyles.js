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

  //For react-responsive Component
  tabletLesspointMediaQuery: '(max-width: ' + semanticVar['@tabletLesspoint'] + ')',
  tabletBreakpointMediaQuery: '(min-width: ' + semanticVar['@tabletBreakpoint'] + ')',


};

module.exports = radiumStyles;
