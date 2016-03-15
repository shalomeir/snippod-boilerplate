import semanticVar from 'theme/semantic-variables';

const styles = {
  userIcon: {
    width: '4em',
    ['@media (max-width: ' + '480px' + ')']: {
      float: 'inherit',
      marginBottom: '0.8em'
    },
  },

  editButton: {
    position: 'absolute',
    top: '0.8em',
    right: '1em',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      marginBottom: '0.8em',
    },
  },

  editButtons: {
    position: 'absolute',
    top: '0.8em',
    right: '1em',
    fontSize: 'inherit',
    border: 0
  },

  header: {
    marginTop: 0,
    marginBottom: '0.4em',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      marginTop: '1em',
    },
  },

  form: {
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      marginTop: '1.2em',
    },
  },

  username: {
    marginTop: '0.5em',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '19em',
  },

  usernameInput: {
    padding: 0,
    fontWeight: 'bold',
    background: 'grey',
    color: 'white',
    width: '90%'
  },

  description: {
    minHeight: '3em',
    marginRight: '2em',
    float: 'left',
    wordBreak: 'break-all',
    textAlign: 'left',
    width: '25em',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      maxWidth: '60%',
    },
    ['@media (max-width: ' + '480px' + ')']: {
      float: 'inherit',
      maxWidth: '100%'
    },
  },

  descriptionField: {
    clear: 'inherit !important',
    width: '25em',
    float: 'left',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      maxWidth: '60%',
    },
    ['@media (max-width: ' + '480px' + ')']: {
      maxWidth: '100%'
    },

  },

  textArea: {

  },

  at: {
    fontWeight: 'initial',
    color: '#C7C7C7'
  },

  extraInfos: {
    clear: 'both',
    marginTop: '1.8em'
  },

  errorText: {
    color: '#9F3A38 !important',
    borderColor: '#E0B4B4 !important',
    fontWeight: 'initial',
    display: 'block !important',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '31em',
  },
};

module.exports = styles;
