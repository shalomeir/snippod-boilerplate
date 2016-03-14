//for validation guide lines

const form = {

  loginForm: {
    passwordMinLength: 2,
    passwordMaxLength: 100,
  },

  registerForm: {
    usernameMinLength: 3,
    usernameMaxLength: 18,
    descriptionMaxLength: 320,
  },

  postsForm: {
    titleMinLength: 6,
    titleMaxLength: 110,
  },

  commentsForm: {
    commentMaxLength: 110,
  }

};

module.exports = form;
