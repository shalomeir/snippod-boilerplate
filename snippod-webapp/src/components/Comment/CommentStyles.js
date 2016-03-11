import semanticVar from 'theme/semantic-variables';

const styles = {
  card: {
    maxWidth: '496px',
    width: '100%'
  },

  cardHeader: {

  },

  meLabel: {
    right: 0,
    top: 0,
    position: 'absolute',
    padding: '0.4em 1.5em',
    ['@media (max-width: ' + semanticVar['@largeMobileLesspoint'] + ')']: {
      top: '2em',
    },
  },

  meLabelContent: {
    textAlign: 'left',
    marginRight: '0.7em'
  },

  meLabelHiddenContent: {
    textAlign: 'left',
    marginLeft: '0.6em'
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
    marginLeft: '2.4em'
  },

  authorName: {
    fontSize: '1em',
    color: 'rgba(0, 0, 0, 0.6)'
  },

  upvoteButton: {
    cursor: 'pointer'
  },

  extraInfos: {
    borderTopStyle: 'none !important',
    fontSize: '0.88em',
    paddingTop: 0
  }
};

module.exports = styles;
