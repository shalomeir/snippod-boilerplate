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

  //in containers/DialogWindows/LoginDialog
  loginTitle: {
    id: 'toast.loginTitle',
    defaultMessage: 'Login Succeed'
  },
  loginBody: {
    id: 'toast.loginBody',
    defaultMessage: 'Welcome, {username}.' //empty
  },
  //in containers/DialogWindows/RegisterDialog
  registerTitle: {
    id: 'toast.registerTitle',
    defaultMessage: 'Registered & Login Succeed'
  },
  registerBody: {
    id: 'toast.registerBody',
    defaultMessage: '{username}, Thank you.' //empty
  },
  //in ducks/authentication/auth
  logoutTitle: {
    id: 'toast.logoutTitle',
    defaultMessage: 'Logout Succeed'
  },
  logoutBody: {
    id: 'toast.logoutBody',
    defaultMessage: 'You are safely logout.' //empty
  },

  //in containers/Posts/PostComposer
  submitPostTitle: {
    id: 'toast.submitPostTitle',
    defaultMessage: 'Posting Succeed'
  },
  submitPostBody: {
    id: 'toast.submitPostBody',
    defaultMessage: '\'{postTitle}\' is posted.' //empty
  },

  //in ducks/posts/posts
  deletePostTitle: {
    id: 'toast.deletePostTitle',
    defaultMessage: 'Post Deleted'
  },
  deletePostBody: {
    id: 'toast.deletePostBody',
    defaultMessage: '\'{postTitle}\' is deleted.' //empty
  },

  //in ducks/posts/posts
  deleteCommentTitle: {
    id: 'toast.deleteCommentTitle',
    defaultMessage: 'Comment Deleted'
  },
  deleteCommentBody: {
    id: 'toast.deleteCommentBody',
    defaultMessage: 'A comment is deleted.' //empty
  },

});

export default toastMessages;
