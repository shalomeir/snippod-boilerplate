import semanticVar from 'theme/semantic-variables';

const styles = {
  userIcon: {
    width: '4em'
  },

  editButton: {
    position: 'absolute',
    top: '0.8em',
    right: '1em',
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
    marginBottom: '0.4em'
  },

  username: {
    marginTop: '0.5em',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'inherit',
  },

  usernameInput: {
    padding: 0,
    minWidth: '13em',
    maxWidth: '19em',
    fontWeight: 'bold',
    background: 'grey',
    color: 'white',
    ['@media (max-width: ' + semanticVar['@tabletLesspoint'] + ')']: {
      maxWidth: '10em',
    },
  },

  description: {
    minHeight: '3em',
    marginRight: '2em',
    float: 'left'
  },

  descriptionField: {
    clear: 'inherit !important',
    width: '25em',
    float: 'left'
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
