import { defineMessages } from 'react-intl';

const logMessages = defineMessages({
  //These messages are used in validation
  default: {
    id: 'log.default',
    defaultMessage: 'Hello'
  },
  required: {
    id: 'log.required',
    defaultMessage: 'Required'
  },
  invalidString: {
    id: 'log.invalidString',
    defaultMessage: 'Can\'t use special characters'
  },
  invalidEmail: {
    id: 'log.invalidEmail',
    defaultMessage: 'Invalid email address'
  },
  invalidUrl: {
    id: 'log.invalidUrl',
    defaultMessage: 'Invalid url'
  },
  minLength: {
    id: 'log.minLength',
    defaultMessage: 'Must be at least {min} characters'
  },
  maxLength: {
    id: 'log.maxLength',
    defaultMessage: 'Must be no more than {max} characters'
  },
  space: {
    id: 'log.space',
    defaultMessage: 'No space'
  },
  integer: {
    id: 'log.integer',
    defaultMessage: 'Must be an integer'
  },
  enumeration: {
    id: 'log.enumeration',
    defaultMessage: 'Must be one of: {enumerations}'
  },
  donotmatch: {
    id: 'log.donotmatch',
    defaultMessage: 'Do not match'
  }
});

export default logMessages;
