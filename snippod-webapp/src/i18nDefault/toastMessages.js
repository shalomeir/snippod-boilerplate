import { defineMessages } from 'react-intl';

const toastMessages = defineMessages({
  //These messages are used in validation

  //Language setup change in ducks/application
  switchLangTitle: {
    id: 'toast.switchLangTitle',
    defaultMessage: 'Language changed'
  },
  switchLangBody: {
    id: 'toast.switchLangBody',
    defaultMessage: 'Setup {lang}'
  },

  //in ducks/authentication
  loginTitle: {
    id: 'toast.loginTitle',
    defaultMessage: 'Login Succeed'
  },
  loginBody: {
    id: 'toast.loginBody',
    defaultMessage: 'Welcome, {username}.' //empty
  },
  registerTitle: {
    id: 'toast.registerTitle',
    defaultMessage: 'Registered & Login Succeed'
  },
  registerBody: {
    id: 'toast.registerBody',
    defaultMessage: '{username}, Thank you.' //empty
  },
  logoutTitle: {
    id: 'toast.logoutTitle',
    defaultMessage: 'Logout Succeed'
  },
  logoutBody: {
    id: 'toast.logoutBody',
    defaultMessage: 'You are safely logout.' //empty
  },


});

export default toastMessages;
