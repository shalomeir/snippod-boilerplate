import semanticVar from 'theme/semantic-variables';

const styles = {
  card: {
    maxWidth: '496px',
    width: '100%'
  },

  cardHeader: {

  },

  meLabel: {
    zIndex: 2,
    width: '6em',
    textAlign: 'right',
    pointerEvents: 'auto'
  },

  meLabelContent: {
    textAlign: 'left',
    marginRight: '0.7em'
  },

  meLabelHiddenContent: {
    textAlign: 'left',
    marginLeft: '0.9em'
  },

  deleteIcon: {
    marginRight: '1em'
  },

  title: {
    fontSize: '1.1em',
    overflow: 'hidden',
    marginTop: '0 !important',
    whiteSpace: 'pre',
  },

  meta: {
    fontSize: '0.85em'
  },

  linkButtonContainer: {
    maxWidth: '300px !important',
    float: 'right',
    marginLeft: 'auto !important',
    marginRight: 'auto !important',
    marginBottom: '0.8em !important',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      float: 'inherit',
    }
  },

  linkButton: {
    textAlign: 'left',
    wordBreak: 'break-all',
    float: 'right',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      float: 'inherit',
    }
  },

  mainContent: {
    paddingTop: '0.6em',
    paddingBottom: '0.4em'
  },

  extraInfos: {
    borderTopStyle: 'none !important',
    fontSize: '0.88em',
    paddingTop: 0
  }
};

module.exports = styles;
