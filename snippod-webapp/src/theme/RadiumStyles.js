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

  raisedCardBoxShadow: {
    boxShadow: '0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08)'
  },

  paddingBySize: {
    padding: '3em', //very padded
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      padding: '1.5em'
    }
  },

  center: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  listMargin: {
    marginTop: '0.5em',
    marginBottom: '0.5em'
  },

  fullWidth: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100% !important'
  },

  floatLeft: {
    float: 'left',
  }

};

module.exports = radiumStyles;
